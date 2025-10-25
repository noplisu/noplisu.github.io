'use client';

import { useEffect } from 'react';
import hljs from 'highlight.js';

export default function SyntaxHighlighter() {
  useEffect(() => {
    // Re-highlight all code blocks after component mounts
    hljs.highlightAll();
  }, []);

  return null;
}
