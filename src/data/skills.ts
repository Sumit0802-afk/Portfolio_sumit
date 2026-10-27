export interface SkillGroup {
  category: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Programming',
    items: ['Python', 'Java', 'C', 'C++'],
  },
  {
    category: 'Web Development',
    items: [
      'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js',
      'Express', 'Tailwind CSS', 'Three.js', 'Vite', 'GSAP', 'Framer Motion',
    ],
  },
  {
    category: 'Data Analytics',
    items: ['Pandas', 'Data Visualization', 'Exploratory Data Analysis'],
  },
  {
    category: 'Databases & Backend',
    items: ['SQL', 'PostgreSQL', 'MySQL', 'Supabase', 'Flask', 'FastAPI', 'SQLAlchemy', 'Prisma', 'Neon'],
  },
  {
    category: 'Tools & Deployment',
    items: ['Git', 'GitHub', 'VS Code', 'Jupyter Notebook', 'AWS', 'Cloudflare', 'Vercel'],
  },
  {
    category: 'Design',
    items: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Canva'],
  },
]
