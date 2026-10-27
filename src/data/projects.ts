export type ProjectStatus = 'operational' | 'prototype' | 'concept'

export interface Project {
  slug: string
  name: string
  tagline: string
  description: string
  features: string[]
  stack: string[]
  repo: string
  demo: string | null
  status: ProjectStatus
  image: string
  category: string
}

export const projects: Project[] = [
  {
    slug: 'nexora',
    name: 'NEXORA',
    tagline: 'Design homes you can walk through.',
    description:
      'A home-design studio: draw 2D floor plans, furnish rooms, plan stairs and a terrace, and explore it all in 3D. Browse 1,200+ generated layouts, start from a photo, and export drawings — every edit in 2D appears in 3D from the same plan.',
    features: [
      '2D editor with snapping, measuring, multiple floors, and undo/redo',
      '3D viewer with a first-person walkthrough that climbs the stairs',
      'Design library of 1,200+ engine-checked layouts with search and filters',
      'Terrace and interior designers with movable, editable furniture',
      'Design checks for stairs, floor heights, terrace access, and plot bounds',
    ],
    stack: ['Next.js 14', 'React 18', 'TypeScript', 'react-konva', 'three.js', 'FastAPI', 'SQLAlchemy', 'PostgreSQL'],
    repo: 'https://github.com/Sumit0802-afk/NEXORA',
    demo: 'https://nexorahome.vercel.app',
    status: 'operational',
    image: '/projects/nexora.webp',
    category: 'Architecture / 3D',
  },
  {
    slug: 'falcon',
    name: 'FALCON',
    tagline: 'Design with purpose. Create without limits.',
    description:
      'An AI-assisted design platform that takes you from a single sentence to a finished, editable design. Includes a design editor, template library, email designer, and an AI Studio.',
    features: [
      'Design editor for building and editing layouts directly',
      'Template library to start from instead of a blank canvas',
      'Email designer for building ready-to-send layouts',
      'AI Studio for generating a starting design from a text prompt',
    ],
    stack: ['Next.js 15', 'React 18', 'TypeScript', 'Tailwind CSS', 'Node.js 22', 'Express', 'Prisma', 'PostgreSQL'],
    repo: 'https://github.com/Sumit0802-afk/FALCON',
    demo: 'https://falcon-six-nu.vercel.app',
    status: 'operational',
    image: '/projects/falcon.webp',
    category: 'Design tool',
  },
  {
    slug: 'kernellab',
    name: 'KernelLab — Lightweight Virtualization Dashboard',
    tagline: 'Isolated environments. Shared kernel. Maximum efficiency.',
    description:
      'A command-center dashboard simulating containers versus virtual machines, including container lifecycle management, namespaces, cgroups, and live resource charts. Built as a B.Tech CSE Operating Systems project.',
    features: [
      'Container lifecycle management (create, start, stop, remove)',
      'Visualized namespaces and cgroups concepts',
      'Live resource usage charts',
      'Side-by-side container vs. VM comparison',
    ],
    stack: ['React 18', 'Vite', 'React Router', 'Tailwind CSS', 'Recharts', 'Lucide Icons'],
    repo: 'https://github.com/Sumit0802-afk/Lightweight-Virtualization-Dashboard',
    demo: 'https://lightweight-liart.vercel.app',
    status: 'operational',
    image: '/projects/kernellab.webp',
    category: 'Systems / education',
  },
  {
    slug: 'nexus',
    name: 'Sumit — Design Portfolio',
    tagline: 'Clarity. Creativity. Consistency. Impact.',
    description:
      'An editorial graphic-design portfolio built in plain HTML, CSS, and JavaScript — no frameworks, no build step. Organizes posters, social creatives, event branding, and web/brand work into a clean, typography-led showcase.',
    features: [
      'Posters — event, campaign, and experimental work',
      'Social creatives — recruitment drives, festive greetings, tributes',
      'Event design — hackathons, workshops, meet-ups',
      'Web and brand identity work',
    ],
    stack: ['HTML', 'CSS', 'JavaScript'],
    repo: 'https://github.com/Sumit0802-afk/nexus_sumit',
    demo: 'https://nexus-sumit.vercel.app',
    status: 'operational',
    image: '/projects/nexus.webp',
    category: 'Design portfolio',
  },
  {
    slug: 'mohit-gupta-portfolio',
    name: 'Mohit Gupta — Photography Portfolio',
    tagline: 'A cinematic portfolio for a visual storyteller.',
    description:
      'A commissioned portfolio site for a photographer and videographer, built around portraits, wildlife, and concert work, with cinematic page transitions and motion throughout.',
    features: [
      'Portrait, wildlife, and concert photography galleries',
      'Cinematic scroll-driven page transitions',
      'Built on Next.js 16 / React 19 with GSAP and Framer Motion for motion',
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'GSAP', 'Framer Motion'],
    repo: 'https://github.com/Sumit0802-afk/mohit-gupta-portfolio',
    demo: 'https://mohit-gupta-portfolio-blue.vercel.app',
    status: 'operational',
    image: '/projects/mohit-gupta.webp',
    category: 'Photography portfolio',
  },
]
