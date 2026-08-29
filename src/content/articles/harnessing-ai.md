---
title: "Harnessing AI: Build your own coding agent"
description: "How I built Fractal Engine—a minimal CLI coding assistant with an agent loop, OpenRouter tool calling, and a small set of filesystem tools you can extend yourself."
excerpt: "You do not need a productized IDE agent to understand how coding agents work. Here is the harness I built: one loop, a handful of tools, and the guardrails that keep it useful."
author: "Grzegorz Lisowski"
publishedAt: "2026-08-29T00:00:00.000Z"
updatedAt: "2026-08-29T00:00:00.000Z"
tags: ["AI", "harness", "Agent", "Python", "OpenRouter"]
category: "case-study"
featured: true
readingTime: 11
slug: "harnessing-ai"
image: "/articles/harnessing-ai/card.webp"
---

## Introduction: Harnessing the power of AI

![Code editor on a laptop](/articles/harnessing-ai/card.webp)

Chatbots answer questions. Coding agents *do work*: they search a repo, read files, edit them, run commands, and keep going until the task is done. The difference is not a smarter model alone—it is the **harness** around the model: the loop, the tools, the prompts, and the limits.

I wanted that loop in something I could read end to end. Not a black-box IDE plugin, not a framework with ten layers of abstraction—just a small CLI that talks to an LLM, exposes a few filesystem tools, and iterates until the model returns a final answer.

That project is [Fractal Engine](https://github.com/noplisu/fractal-engine): a minimal coding assistant in Python, powered by OpenRouter, packaged so you can run one prompt or drop into an interactive REPL.

This case study walks through the pieces: what an agent actually needs, how tools are defined and called, where guardrails matter, and what building your own teaches you that using someone else’s agent never will.

---

## AI Agent components

![Glowing AI chip on a circuit board](/articles/harnessing-ai/agent-loop.webp)

Strip away branding and a coding agent is four moving parts:

1. **A model client** — Fractal uses the OpenAI-compatible SDK pointed at [OpenRouter](https://openrouter.ai/), so you can swap models with an env var (`FRACTAL_MODEL`) without rewriting the loop.
2. **A conversation** — a list of messages: system prompt, user turns, assistant turns, and tool results. That list *is* the agent’s memory for the session.
3. **An agent loop** — call the model; if it returns tool calls, execute them, append results, call again; if it returns plain text, stop.
4. **Tools** — small, typed functions the model can invoke: Grep, Glob, Read, Write, StrReplace, Bash, and so on.

The entry point is thin: parse flags (`-p` for a single prompt, `-i` for interactive), resolve `--cwd`, build the initial system message, and hand off to the loop.

```python
client = OpenAI(api_key=API_KEY, base_url=BASE_URL)
messages = initial_messages(cwd, args.max_iterations)

if args.prompt:
    messages.append({"role": "user", "content": args.prompt})
    content, status = run_agent_loop(
        client,
        messages,
        max_iterations=args.max_iterations,
        max_tokens=args.max_tokens,
        verbose=args.verbose,
    )
```

Interactive mode reuses the same loop. Each user line becomes another message; `/clear` resets to the system prompt. The interesting logic is not in `main.py`—it is in how the loop and tools cooperate.

---

## AI tools

A tool is not “whatever Bash can do.” It is a named capability with a JSON schema the model sees, plus a local executor that turns arguments into a string result.

In Fractal, that shape is a frozen dataclass:

```python
@dataclass(frozen=True)
class Tool:
    """One agent tool: OpenAI function schema plus an executor."""

    name: str
    description: str
    parameters: dict
    execute: Callable[[dict[str, Any]], str]

    def to_openai_spec(self) -> dict:
        return {
            "type": "function",
            "function": {
                "name": self.name,
                "description": self.description,
                "parameters": self.parameters,
            },
        }
```

Each tool lives in its own module under `app/tools/`, exports `tool = Tool(...)`, and is registered in `ALL_TOOLS`. Adding a capability is deliberately boring: write the executor, declare the schema, append to the registry.

The built-in set mirrors what you expect from a coding assistant:

| Tool | Role |
|------|------|
| Grep / Glob / ListDir | Find things without dumping the whole tree into context |
| Read | Pull file contents into the conversation |
| Write / WriteSections | Create or rewrite files |
| StrReplace | Surgical edits (preferred for small changes) |
| Bash | Escape hatch for commands the others cannot express |

`WriteSections` exists for a practical reason: large HTML (or any big file) is painful to shove through a single JSON string argument. Splitting into ordered sections reduces escaping failures. When that still breaks, the system prompt steers the model toward a Bash heredoc or base64 via `Write`.

Tool output is truncated (`MAX_TOOL_OUTPUT`) so one noisy `find` or `cat` cannot blow the context window. Unknown tools and bad JSON become error *strings* returned to the model—not process crashes—so the agent can recover on the next turn.

---

## AI tool calling

The agent loop is the harness. Pseudocode is almost the whole design:

```text
for turn in 1..max_iterations:
    response = model(messages, tools)
    append assistant message
    if no tool_calls:
        return final text
    for each tool_call:
        result = execute(tool_call)
        append role=tool message with result
return "hit iteration limit"
```

### Roles in the message list

That `messages` array is not free-form chat text. It is a typed transcript the API understands. Fractal uses the OpenAI-compatible roles:

| Role | Who writes it | What it carries |
|------|---------------|-----------------|
| `system` | Your harness | Rules, cwd, tool preferences—set once at the start |
| `user` | The human (or `-p`) | The task for this turn |
| `assistant` | The model | Either a final answer (`content`) or one or more `tool_calls` |
| `tool` | Your harness | The string result of a tool, linked back by `tool_call_id` |

A plain chatbot only ever sees `system` / `user` / `assistant` with string content. An agent adds the fourth role and a structured shape on the assistant turn: instead of (or alongside) prose, the model returns `tool_calls`—named functions plus JSON arguments. Your code runs them locally and appends `role: "tool"` messages. The *next* model call sees those results as part of history, as if the assistant had looked at the filesystem and come back with notes.

### What a tool call looks like on the wire

Suppose the user asks to list Python files. After the system prompt and user message, a typical turn looks like this (simplified):

```json
[
  {
    "role": "system",
    "content": "You are Fractal Agent… Working directory: /project …"
  },
  {
    "role": "user",
    "content": "list Python files in this directory"
  },
  {
    "role": "assistant",
    "content": null,
    "tool_calls": [
      {
        "id": "call_abc123",
        "type": "function",
        "function": {
          "name": "Glob",
          "arguments": "{\"pattern\": \"**/*.py\"}"
        }
      }
    ]
  },
  {
    "role": "tool",
    "tool_call_id": "call_abc123",
    "content": "app/main.py\napp/agent.py\napp/config.py\n…"
  },
  {
    "role": "assistant",
    "content": "Here are the Python files under the working directory:\n- app/main.py\n- app/agent.py\n…"
  }
]
```

Three details matter:

1. **`tool_calls` live on the assistant message**, not as a separate role. Fractal’s `assistant_message_to_dict` copies `id`, `type`, and `function.{name,arguments}` into the history so the provider can match later tool results.
2. **`arguments` are a JSON *string***, even when nested. The harness parses that string before calling `tool.execute`. Invalid JSON becomes an error string in a `tool` message—the model gets another turn to recover.
3. **`tool_call_id` must match**. Each `role: "tool"` reply points at the call it answers. Without that link, the API cannot attach “Glob returned these paths” to “you asked for Glob.”

A single assistant turn can request several tools at once. Fractal executes them in order and appends one `tool` message per call before asking the model again.

### Wiring it in the loop

In Fractal that lives in `run_agent_loop`. The model is called with `tools=openai_tool_specs()`. When `message.tool_calls` is empty, the content is the answer. Otherwise each call is executed and appended with the matching `tool_call_id` so the next completion sees what happened.

```python
message = chat.choices[0].message
messages.append(assistant_message_to_dict(message))

if not message.tool_calls:
    return message.content, "ok"

for tool_call in message.tool_calls:
    result = execute_tool_call(tool_call)
    messages.append(
        {
            "role": "tool",
            "tool_call_id": tool_call.id,
            "content": result,
        }
    )
```

That is the whole contract: the model proposes work; the harness performs it and writes the evidence back into `messages`; the model either proposes more work or stops with a final `content` string.

A few details matter in practice:

- **Max iterations** (default 25) stop runaway loops when the model keeps grepping forever.
- **Verbose mode** logs turns and tool names to stderr; otherwise a spinner shows “Thinking” / “Running Grep…”.
- **API failures** (402 credits, 429 rate limits, connection errors) return a clear status instead of leaving a half-broken history in interactive mode—the failed user turn can be dropped so a retry does not duplicate context.

Tool calling is where “chat” becomes “agent.” Without it, you have autocomplete with opinions. With it, the model can inspect reality before changing it.

---

## Guardrails

A harness without limits is a liability. Fractal keeps guardrails light but deliberate:

**Prompt policy.** The system prompt names the working directory, prefers StrReplace over wholesale rewrites, prefers Grep/Glob/ListDir over Bash for discovery, asks for minimal diffs, and forbids destructive commands (`rm -rf`, `git push --force`) unless the user explicitly asks.

**Budget awareness.** The prompt tells the model how many turns it has left (`max_iterations`), so it plans tool use instead of exploring endlessly.

**Path and process safety.** Tools resolve paths relative to the chosen `--cwd`. Bash runs with a timeout. Output is truncated. Directory skips ignore `.git`, `node_modules`, `.venv`, and similar noise.

**Recoverable failures.** Invalid JSON arguments and tool exceptions become messages the model can read. The prompt explicitly says: if Write fails on JSON, switch strategy—do not retry the same broken approach.

**Operational knobs.** `--max-tokens`, `--max-iterations`, and model selection via env vars let you trade cost and depth without editing code. Free or low-credit OpenRouter keys force you to learn that token budgets are part of the harness, not an afterthought.

None of this replaces a sandboxed environment for untrusted prompts. It does make a personal coding agent *predictable* enough to use on your own machine.

---

## The Results: Own AI agent

What you get after wiring those pieces is a usable CLI:

```sh
./run.sh -p "list Python files in this directory"
./run.sh -i
./run.sh -p "summarize app/main.py" -i
```

That is enough to explore a repo, apply small patches, scaffold files, and run tests—the same *shape* of workflow larger products advertise, in a codebase you can finish reading in an afternoon.

Owning the harness means you can:

- Add a domain tool (e.g. “run the test suite and return failures only”) without waiting on a vendor.
- Change the system prompt when the model keeps making the same mistake.
- Point at a different OpenRouter model when price or quality shifts.
- Teach yourself, by reading `agent.py` and `tools/`, what every commercial agent is doing under the UI.

Fractal is intentionally small. That is the point. The value is not feature parity with Cursor or Claude Code—it is a clear mental model of the loop those products wrap in product surface.

---

## Lessons Learned

**The loop is the product.** Fancy tool lists do not help if iteration limits, history handling, and error paths are wrong. Get `run_agent_loop` solid before adding the twentieth tool.

**Schema and description are UX for the model.** Vague tool descriptions produce vague calls. Precise parameters and “prefer X over Y” hints in both the schema and the system prompt reduce flailing.

**JSON is a bottleneck.** Large file writes fail in entertaining ways. Dedicated tools (`WriteSections`), heredocs, and base64 are not polish—they are survival strategies for tool-calling APIs.

**Return errors as data.** Crashing the process on a bad path teaches the user nothing. Returning `Error: …` teaches the model.

**Abstraction has a cost.** Frameworks hide the message list and the tool registry. Building them once by hand makes every other agent framework legible.

**Credits and tokens are design constraints.** A 402 from OpenRouter is not just ops—it forces you to decide what “enough context” means for a coding turn.

---

## Conclusion

An AI coding harness is less mysterious than the marketing suggests: a model, a message list, a loop, and a handful of tools with guardrails. [Fractal Engine](https://github.com/noplisu/fractal-engine) is my version of that stack—minimal on purpose, so the mechanics stay visible.

If you only ever use someone else’s agent, you ship faster. If you build one once, you understand what you are relying on: which failures are the model’s, which are the harness’s, and where a single better tool or a clearer prompt buys more than jumping to a larger model.

Clone it, point it at a repo you know, watch the tool calls with `-v`, then add one tool of your own. That is the shortest path from “AI can code” as a slogan to “I know how the agent actually works.”
