# Sumit Bhamu — Portfolio

A dark, emerald-accented developer portfolio built from scratch — selected work, a live GitHub
analytics dashboard, and a working contact form, no templates.

> about.ts
```ts
const portfolio = {
    tagline: "From complex problems to meaningful digital solutions.",
    what: "A personal portfolio — projects, toolkit, resume and a live contact form",
    liveDemo: "https://portfolio-sumit.vercel.app",
    sections: ["Selected work", "Tech stack", "GitHub analytics", "About", "Resume", "Contact"],
    stack: {
        frontend: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "React Router"],
        motion: ["GSAP", "@react-spring/web", "spring-text-engine"],
        threeD: ["Three.js"],
        backend: ["Vercel serverless function (api/gh.ts)"],
    },
    belief: "A portfolio should be as carefully built as the projects it links to.",
};
```

> features

| | |
|---|---|
| 🧭 **Selected work** | Horizontal scroll gallery of real projects, each with repo, live demo and stack |
| 📊 **GitHub analytics** | Live contribution heatmap, monthly/weekly charts, language mix, repo grid and activity feed — all fetched from the real GitHub API |
| 🎨 **Motion** | Spring-based text reveals, a bokeh cursor trail, and a scroll-pinned horizontal gallery |
| ✉️ **Contact** | A working form (Web3Forms) with an animated particle background, not a `mailto:` stub |
| 📄 **Resume** | Full timeline, skills and projects on the page, plus a downloadable PDF |

> quick_start

You need: Node.js 18+ and npm.

```bash
# 1. clone
git clone https://github.com/Sumit0802-afk/Portfolio_sumit.git
cd Portfolio_sumit

# 2. install
npm install

# 3. run  ->  http://localhost:5173
npm run dev
```

> config.env

Copy `.env.local.example` to `.env.local` and fill in what you need — both are optional, the
site works without them, just with a lower GitHub API rate limit and a disabled contact form.

```bash
# raises the GitHub Analytics section's rate limit from 60/hr to 5000/hr in dev
VITE_GITHUB_TOKEN=

# makes the contact form actually send mail — get a free key at web3forms.com
VITE_WEB3FORMS_KEY=
```

> architecture
```
src/
├── pages/              one file per route — Home, Work, About, Resume, Contact, ...
├── components/
│   ├── github/          the GitHub Analytics dashboard (heatmap, charts, repo grid, activity)
│   ├── ui/               shared primitives — Heading, SectionHeading, TechTag
│   └── *.tsx             Navbar, Footer, Hero, CursorBokeh, ProjectCard, ...
├── data/                 profile, projects, skills, notes — all the site's content
└── lib/github.ts         GitHub REST + contribution-calendar API client

api/gh.ts                 Vercel serverless proxy for the GitHub API (keeps a token server-side)
```

> deploy

Builds as a static site with one serverless function, deployed on Vercel.

```yaml
frontend:
  host: Vercel
  buildCommand: npm run build
  outputDirectory: dist
  env: { GITHUB_TOKEN: "<optional, raises the shared rate limit to 5000/hr>" }

contactForm:
  env: { VITE_WEB3FORMS_KEY: "<same key as .env.local>" }
```

> author

**Sumit Bhamu**

B.Tech CSE (Data Analytics), VIT-AP University. Designed, built and deployed this portfolio —
layout, motion, the GitHub analytics dashboard, and the contact pipeline.

- GitHub: [@Sumit0802-afk](https://github.com/Sumit0802-afk)
- LinkedIn: [sumit-bhamu](https://www.linkedin.com/in/sumit-bhamu-631819334/)
