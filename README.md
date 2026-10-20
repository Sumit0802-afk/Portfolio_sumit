# Sumit Bhamu — Portfolio

A dark, emerald-accented developer portfolio built from scratch — selected work, a live GitHub
analytics dashboard, and a working contact form, no templates.

<table>
<tr>
<td width="50%">
<img src="docs/screenshots/hero.jpg" alt="Hero section" />
<br />🪐 <b>Hero</b><br />A particle globe, spring-text reveal, and a bokeh cursor trail
</td>
<td width="50%">
<img src="docs/screenshots/github-analytics.jpg" alt="GitHub Analytics dashboard" />
<br />📊 <b>GitHub analytics</b><br />Live contribution heatmap, streaks, and activity, fetched from the real API
</td>
</tr>
<tr>
<td width="50%" colspan="2">
<img src="docs/screenshots/contact.jpg" alt="Contact section" />
<br />✉️ <b>Contact</b><br />A working form with a particle-network background, not a mailto stub
</td>
</tr>
</table>

A portfolio should be as carefully built as the projects it links to.

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
};
```

> tech_stack

> features

🪐  **Hero**
A particle globe background, spring-based text reveal on every heading, and a bokeh particle trail that follows the cursor	📊  **GitHub analytics**
A full dashboard fetched live from GitHub — contribution heatmap with hover tooltips, streaks, monthly/weekly charts, language mix, sortable repos and a recent-activity feed	🖱️  **Horizontal work gallery**
A GSAP scroll-pinned, scrubbed horizontal gallery of real projects, each linking to its repo, live demo and stack

🛠️  **Tech stack page**
Brand icons for every language, framework and tool actually used, grouped by category	📄  **Resume**
The full timeline, skills and projects inline, plus a one-click PDF download	✉️  **Contact**
A real working form (Web3Forms) with Name / Email / Project type / Message, a particle-network background, and five social cards

Every feature runs on real data — nothing on the GitHub analytics page or the project cards is hand-typed.

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

> roadmap

| | |
|---|---|
| ✅ **Selected work** | Horizontal scroll gallery, project detail pages, repo + live links |
| ✅ **GitHub analytics** | Heatmap, streaks, charts, repo grid, activity feed |
| ✅ **Contact** | Working form, social cards, particle background |
| 🔜 **Notes** | A small written-notes section — structure is in, content is still thin |
| 🔜 **Tests** | No automated tests yet, just `tsc` and a production build on every change |

> author

**Sumit Bhamu**

B.Tech CSE (Data Analytics), VIT-AP University. Designed, built and deployed this portfolio —
layout, motion, the GitHub analytics dashboard, and the contact pipeline.

- GitHub: [@Sumit0802-afk](https://github.com/Sumit0802-afk)
- LinkedIn: [sumit-bhamu](https://www.linkedin.com/in/sumit-bhamu-631819334/)
