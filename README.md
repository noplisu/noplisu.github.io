This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploy

The page is deployed using github-actions automatically with changes to the main branch.

## Sitemap

Sitemaps and `robots.txt` are generated after each production build by [next-sitemap](https://github.com/iamvishnusankar/next-sitemap). Configuration lives in `next-sitemap.config.js` (`siteUrl` is `https://noplisu.com`).

```bash
npm run build
```

That runs `next build` (static export to `out/`) and then `next-sitemap`, which writes `out/sitemap.xml`, `out/sitemap-0.xml`, and `out/robots.txt`. To regenerate sitemaps without a full rebuild (after `out/` already exists):

```bash
npm run sitemap
```
