// Brand icon URLs for the tools in skills.ts, keyed by the same name used
// there. Sourced from the Simple Icons CDN (official brand colors), with a
// few entries from a pinned Devicon release for brands Simple Icons doesn't
// carry (Java, C, C++, VS Code, AWS, generic SQL). Tools with no sensible
// logo (e.g. "Data Visualization") are left out — the grid only renders
// entries that exist here.

const simple = (slug: string, color?: string) =>
  `https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ''}`

const devicon = (path: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/${path}.svg`

export const techIcons: Record<string, string> = {
  Python: simple('python', '3776AB'),
  Java: devicon('java/java-original'),
  C: devicon('c/c-original'),
  'C++': devicon('cplusplus/cplusplus-original'),

  HTML: simple('html5', 'E34F26'),
  CSS: simple('css', '663399'),
  JavaScript: simple('javascript', 'F7DF1E'),
  TypeScript: simple('typescript', '3178C6'),
  React: simple('react', '61DAFB'),
  'Next.js': simple('nextdotjs', 'FFFFFF'),
  'Node.js': simple('nodedotjs', '5FA04E'),
  Express: simple('express', 'FFFFFF'),
  'Tailwind CSS': simple('tailwindcss', '06B6D4'),
  'Three.js': simple('threedotjs', 'FFFFFF'),
  Vite: simple('vite', '646CFF'),
  GSAP: simple('gsap', '0AE448'),
  'Framer Motion': simple('framer', 'FFFFFF'),

  Pandas: simple('pandas', '150458'),

  SQL: devicon('azuresqldatabase/azuresqldatabase-original'),
  PostgreSQL: simple('postgresql', '4169E1'),
  MySQL: simple('mysql', '4479A1'),
  Flask: simple('flask', 'FFFFFF'),
  FastAPI: simple('fastapi', '009688'),
  SQLAlchemy: simple('sqlalchemy', 'D71F00'),
  Prisma: simple('prisma', 'FFFFFF'),
  Neon: simple('neon', '00E599'),

  Git: simple('git', 'F05032'),
  GitHub: simple('github', 'FFFFFF'),
  'VS Code': devicon('vscode/vscode-original'),
  'Jupyter Notebook': simple('jupyter', 'F37626'),
  AWS: devicon('amazonwebservices/amazonwebservices-original-wordmark'),
  Cloudflare: simple('cloudflare', 'F38020'),
  Vercel: simple('vercel', 'FFFFFF'),

  Figma: devicon('figma/figma-original'),
  'Adobe Photoshop': devicon('photoshop/photoshop-plain'),
  'Adobe Illustrator': devicon('illustrator/illustrator-plain'),
  Canva: devicon('canva/canva-original'),
}
