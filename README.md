<!-- Header -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=220&color=0:000000,50:00B37E,100:00FF9D&text=PORTFOLIO&fontColor=ffffff&fontSize=70&fontAlignY=38&desc=From%20complex%20problems%20to%20meaningful%20digital%20solutions.&descAlignY=60&descSize=18&animation=fadeIn" alt="Sumit Bhamu — from complex problems to meaningful digital solutions." width="100%" />
</p>

<!-- Views -->
<p align="right">
  <a href="https://github.com/Sumit0802-afk/Portfolio_sumit">
    <img src="https://komarev.com/ghpvc/?username=Sumit0802-afk-Portfolio&label=Repo%20Views&color=00B37E&style=flat" alt="Repo views" />
  </a>
</p>

<!-- Typing SVG -->
<p align="center">
  <a href="https://portfolio-sumit.vercel.app">
    <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=500&size=22&duration=3500&pause=900&color=00FF9D&center=true&vCenter=true&multiline=false&repeat=true&random=false&width=720&height=50&lines=A+developer+portfolio%2C+built+from+scratch;Selected+work+%C2%B7+GitHub+analytics+%C2%B7+Resume+%C2%B7+Contact;No+templates%2C+no+fabricated+data" alt="A developer portfolio, built from scratch" />
  </a>
</p>

<!-- Links -->
<p align="center">
  <a href="https://portfolio-sumit.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live demo" />
  </a>&nbsp;
  <a href="https://github.com/Sumit0802-afk/Portfolio_sumit" target="_blank">
    <img src="https://img.shields.io/badge/Repository-000000?style=for-the-badge&logo=github&logoColor=white" alt="Repository" />
  </a>&nbsp;
  <a href="#-quick_start">
    <img src="https://img.shields.io/badge/Quick_Start-000000?style=for-the-badge&logo=gnubash&logoColor=white" alt="Quick start" />
  </a>&nbsp;
  <a href="#-deploy">
    <img src="https://img.shields.io/badge/Deploy-000000?style=for-the-badge&logo=rocket&logoColor=white" alt="Deploy" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_18-000000?style=flat-square&logo=react&logoColor=61DAFB" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-000000?style=flat-square&logo=typescript&logoColor=3178C6" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-000000?style=flat-square&logo=vite&logoColor=B73BFE" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-000000?style=flat-square&logo=tailwindcss&logoColor=38BDF8" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/GSAP-000000?style=flat-square&logo=greensock&logoColor=88CE02" alt="GSAP" />
  <img src="https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=threedotjs&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
</p>

<br>

<!-- At a glance -->
<table align="center">
  <tr>
    <td align="center" width="25%" valign="top">
      <h3>🪐</h3>
      <b>Hero</b><br>
      <sub>Particle globe, spring-text reveal, a bokeh cursor trail</sub>
    </td>
    <td align="center" width="25%" valign="top">
      <h3>📊</h3>
      <b>GitHub analytics</b><br>
      <sub>Heatmap, streaks, charts — fetched live, not hand-typed</sub>
    </td>
    <td align="center" width="25%" valign="top">
      <h3>🖱️</h3>
      <b>Selected work</b><br>
      <sub>A GSAP scroll-pinned horizontal gallery of real projects</sub>
    </td>
    <td align="center" width="25%" valign="top">
      <h3>✉️</h3>
      <b>Contact</b><br>
      <sub>A form that actually sends mail, with a particle background</sub>
    </td>
  </tr>
</table>

<br>

<p align="center">
  <img src="docs/screenshots/hero.jpg" width="48%" alt="Hero section" />
  <img src="docs/screenshots/github-analytics.jpg" width="48%" alt="GitHub Analytics dashboard" />
</p>
<p align="center">
  <img src="docs/screenshots/contact.jpg" width="96%" alt="Contact section" />
</p>

<br>

<blockquote align="center">
  <b>A portfolio should be as carefully built as the projects it links to.</b>
</blockquote>

<!-- Visitor flow -->
```mermaid
flowchart LR
    A([👀 Visitor arrives]) --> B[🪐 Hero]
    B --> C[🖱️ Selected work]
    C --> D[📊 GitHub analytics<br/>live data]
    D --> E[🛠️ Tech stack · 📄 Resume]
    E --> F([✉️ Contact — real email sent])
```

<br>

<!-- About -->
## `> about.ts`

```typescript
const portfolio = {
    tagline: "From complex problems to meaningful digital solutions.",
    what: "A personal portfolio — projects, toolkit, resume and a live contact form",
    liveDemo: "https://portfolio-sumit.vercel.app",
    sections: ["Selected work", "Tech stack", "GitHub analytics", "About", "Resume", "Contact"],
    stack: {
        frontend: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "React Router"],
        motion: ["GSAP", "@react-spring/web", "spring-text-engine"],
        threeD: ["Three.js"],
        backend: ["Vercel serverless function (api/gh.ts)"]
    },
    belief: "A portfolio should be as carefully built as the projects it links to."
};
```

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=rect&height=2&color=0:000000,50:00B37E,100:00FF9D" alt="" width="100%" />
</p>

<!-- Tech Stack -->
## `> tech_stack`

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,ts,vite,tailwind,threejs,vercel,git,github&theme=dark&perline=12" alt="React, TypeScript, Vite, Tailwind CSS, three.js, Vercel, Git, GitHub" />
  </a>
</p>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=rect&height=2&color=0:000000,50:00B37E,100:00FF9D" alt="" width="100%" />
</p>

<!-- Features -->
## `> features`

<table align="center">
  <tr>
    <td width="33%" valign="top">
      🪐 &nbsp;<b>Hero</b><br>
      <sub>Particle globe, spring-text headings, bokeh cursor trail</sub>
    </td>
    <td width="33%" valign="top">
      🖱️ &nbsp;<b>Selected work</b><br>
      <sub>GSAP scroll-pinned horizontal gallery, repo + demo links</sub>
    </td>
    <td width="33%" valign="top">
      📊 &nbsp;<b>GitHub analytics</b><br>
      <sub>Heatmap, streaks, language mix, sortable repos, activity feed</sub>
    </td>
  </tr>
  <tr>
    <td width="33%" valign="top">
      🛠️ &nbsp;<b>Tech stack</b><br>
      <sub>Brand icons for every tool actually used, grouped by category</sub>
    </td>
    <td width="33%" valign="top">
      📄 &nbsp;<b>Resume</b><br>
      <sub>Full timeline and skills inline, plus a one-click PDF download</sub>
    </td>
    <td width="33%" valign="top">
      ✉️ &nbsp;<b>Contact</b><br>
      <sub>Working form (Web3Forms), five social cards, particle background</sub>
    </td>
  </tr>
</table>

<details>
<summary><b>Every feature, in detail</b></summary>
<br>

```typescript
const githubAnalytics = {
    source: "the real GitHub REST API + a public contribution-calendar API",
    heatmap: "52 weeks of daily contributions, hover tooltips, a Less→More legend",
    kpis: ["contributions", "repositories", "stars", "followers", "following", "longest streak"],
    charts: ["monthly contributions", "weekly coding rhythm"],
    repos: "sortable — recently updated, most starred, alphabetical",
    activity: "recent public events — pushes, PRs, issues, new repos",
    rule: "never fabricates a number; shows a retry state if the API is unreachable"
};

const contact = {
    fields: ["Name", "Email", "Project type", "Message"],
    delivery: "Web3Forms — a real email, not a mailto: link",
    background: "a canvas particle network, cursor-reactive, pointer-events: none",
    socials: ["Email", "WhatsApp", "GitHub", "LinkedIn", "Instagram"]
};

const motion = {
    text: "spring-text-engine — every heading animates in letter by letter",
    scroll: "GSAP ScrollTrigger — the horizontal project gallery pins and scrubs",
    cursor: "a canvas bokeh trail follows the pointer, off on touch devices",
    rule: "respects prefers-reduced-motion everywhere"
};
```

</details>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=rect&height=2&color=0:000000,50:00B37E,100:00FF9D" alt="" width="100%" />
</p>

<!-- Quick start -->
## `> quick_start`

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

<!-- Config -->
## `> config.env`

Copy `.env.local.example` to `.env.local` and fill in what you need — both are optional, the
site works without them, just with a lower GitHub API rate limit and a disabled contact form.

```bash
# raises the GitHub Analytics section's rate limit from 60/hr to 5000/hr in dev
VITE_GITHUB_TOKEN=

# makes the contact form actually send mail — get a free key at web3forms.com
VITE_WEB3FORMS_KEY=
```

<!-- Architecture -->
## `> architecture`
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

<!-- Deploy -->
## `> deploy`

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

<!-- Roadmap -->
## `> roadmap`

| | |
|---|---|
| ✅ **Selected work** | Horizontal scroll gallery, project detail pages, repo + live links |
| ✅ **GitHub analytics** | Heatmap, streaks, charts, repo grid, activity feed |
| ✅ **Contact** | Working form, social cards, particle background |
| 🔜 **Notes** | A small written-notes section — structure is in, content is still thin |
| 🔜 **Tests** | No automated tests yet, just `tsc` and a production build on every change |

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=rect&height=2&color=0:000000,50:00B37E,100:00FF9D" alt="" width="100%" />
</p>

<!-- Author -->
## `> author`

<table align="center">
  <tr>
    <td align="center">
      <img src="https://github.com/Sumit0802-afk.png" width="90" style="border-radius:50%" alt="Sumit Bhamu" /><br>
      <b>Sumit Bhamu</b><br>
      <sub>B.Tech CSE (Data Analytics), VIT-AP University</sub><br><br>
      Designed, built and deployed this portfolio — layout, motion, the GitHub analytics
      dashboard, and the contact pipeline.<br><br>
      <a href="https://github.com/Sumit0802-afk"><img src="https://img.shields.io/badge/GitHub-000000?style=flat-square&logo=github&logoColor=white" alt="GitHub" /></a>
      <a href="https://www.linkedin.com/in/sumit-bhamu-631819334/"><img src="https://img.shields.io/badge/LinkedIn-000000?style=flat-square&logo=linkedin&logoColor=0A66C2" alt="LinkedIn" /></a>
    </td>
  </tr>
</table>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=100&color=0:000000,50:00B37E,100:00FF9D&section=footer" alt="" width="100%" />
</p>
