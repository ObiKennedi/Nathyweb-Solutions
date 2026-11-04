/*
  Add a project = add an object here.
  - video:  put the file in public/media/work/ (MP4, H.264, no audio, ~1280px wide, 10–20s loop)
  - poster: a still frame shown before the video loads
  - device: 'laptop' for websites/web apps, 'phone' for mobile apps
*/
const projects = [
  {
    id: 'nesora',
    title: 'Nesora',
    client: 'Nesora Systems',
    category: 'Web App / Streaming',
    year: '2026',
    summary:
      'A next-generation creator video streaming platform crafted for seamless content discovery, high-fidelity video playback, and immersive creator-audience engagement.',
    highlights: [
      'Low-latency video streaming with custom media player',
      'Creator channel profiles, content discovery & watchlists',
      'Tailored dark-mode UI with fluid animations & quick search',
    ],
    stack: ['Next.js', 'React', 'Turbopack', 'SCSS'],
    url: 'https://nesora.org',
    video: '/media/work/nesora.mp4',
    poster: '/media/work/nesora.jpg',
    device: 'laptop',
  },
  {
    id: 'sterling-logs',
    title: 'Sterling Logs',
    client: 'Sterling Logs Market LTD',
    category: 'Web Marketplace',
    year: '2026',
    summary:
      'A high-trust digital marketplace engineered for verified social media accounts and organic traffic assets, backed by instant automated escrow and local payment rails.',
    highlights: [
      'Automated escrow checkout & real-time inventory delivery',
      'Direct PalmPay & Naira local payments with zero FX friction',
      'Developer REST API with webhooks for reseller platforms',
    ],
    stack: ['Next.js', 'TypeScript', 'Node.js', 'REST API'],
    url: 'https://sterlinglogs.com',
    video: '/media/work/sterlinglogs.mp4',
    poster: '/media/work/project-two.jpg',
    device: 'laptop',
  },
  {
    id: 'soboggan-Web',
    title: 'Soboggan Management',
    client: 'Soboggan Management LTD',
    category: 'Corporate / FinTech',
    year: '2025',
    summary:
      'An institutional investment intelligence portal offering macroeconomic analysis, Sub-Saharan capital allocation models, and deep-dive equity research for high-net-worth investors.',
    highlights: [
      'Institutional market research & NGX equities allocation models',
      'Interactive financial data visualization & publication reader',
      'Sleek responsive architecture with smooth scroll interactions',
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'SCSS'],
    url: 'https://soboggan-blog.vercel.app/',
    video: '/media/work/soboggan.mp4',
    poster: '/media/work/project-three.jpg',
    device: 'laptop',
  },
  {
    id: 'street-io',
    title: 'Street IO',
    client: 'Street IO',
    category: 'Digital Publication',
    year: '2026',
    summary:
      'An alternative educational media platform and curated knowledge publication delivering practical street-smart business frameworks, culture, and life playbooks beyond traditional curricula.',
    highlights: [
      'Editorial publication engine with distraction-free reading mode',
      'Curated topic taxonomies, bookmarking & social sharing',
      'Blazing-fast page loads optimized for mobile & search visibility',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind / SCSS', 'Vercel'],
    url: 'https://streetio.org',
    video: '/media/work/streetio.mp4',
    poster: '/media/work/nesora.jpg',
    device: 'laptop',
  },
];

export default projects;
