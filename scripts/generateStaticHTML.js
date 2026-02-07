import fs from 'fs-extra';
import path from 'path';
import puppeteer from 'puppeteer';
import { execSync, spawn } from 'child_process';

const ROUTES = [
  '/',
  '/iq-test',
  '/reaction-test',
  '/mental-age-test',
  '/username-iq-checker',
  '/blog',
  '/about-us',
  '/privacy-policy',
  '/terms',
  '/disclaimer',
  '/contact',
  '/dmca'
];

// Add blog posts slugs here (should be automated in production, but keeping it simple for now)
const BLOG_SLUGS = [
  'what-is-iq',
  'good-iq-score',
  'online-iq-accuracy',
  'average-iq-by-age',
  'mental-age-vs-iq',
  'brain-training',
  'increase-iq',
  'logic-puzzles'
];

const ALL_ROUTES = [...ROUTES, ...BLOG_SLUGS.map(slug => `/blog/${slug}`)];

const METADATA = {
  '/': {
    title: 'IQ Checker XYZ - Accurate Online IQ Test & Cognitive Tools',
    description: 'Discover your intellectual potential with IQ Checker XYZ. Fast, scientifically designed cognitive assessments, logic puzzles, and psychological tools. Free instant results.',
  },
  '/iq-test': {
    title: 'Free Online IQ Test 2026 - Accurate Results | IQ Checker XYZ',
    description: 'Take our 15-question scientifically designed IQ test. Accurate logical reasoning and pattern recognition assessment with instant results.',
  },
  '/reaction-test': {
    title: 'Human Reaction Time Test - Check Your Reflexes | IQ Checker XYZ',
    description: 'Measure your visual reaction speed in milliseconds. Compare your reflexes against the global average with our high-precision tool.',
  },
  '/mental-age-test': {
    title: 'What is Your Mental Age? - Psychological Maturity Test | IQ Checker XYZ',
    description: 'Discover your psychological age relative to your chronological age. Assessment based on cognitive behavior and maturity patterns.',
  },
  '/username-iq-checker': {
    title: 'Username IQ Checker - Fun Cognitive Analysis | IQ Checker XYZ',
    description: 'An AI-powered fun heuristic to estimate the "intellectual vibe" of your username or handle. Try it for free!',
  },
  '/blog': {
    title: 'Intelligence & Cognitive Science Blog | IQ Checker XYZ',
    description: 'Deep dives into psychometrics, IQ accuracy, brain training science, and cognitive evolution over time.',
  },
  '/about-us': {
    title: 'About IQ Checker XYZ - Our Mission & Authority',
    description: 'Learn about the mission behind IQ Checker XYZ and our commitment to accurate, accessible cognitive benchmarking tools.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | IQ Checker XYZ',
    description: 'Detailed information on how we handle user privacy and data security. Your data stays in your browser.',
  },
  '/terms': {
    title: 'Terms and Conditions | IQ Checker XYZ',
    description: 'Legal terms and conditions for using the IQ Checker XYZ platform and cognitive tools.',
  },
  '/disclaimer': {
    title: 'Disclaimer | IQ Checker XYZ',
    description: 'Important legal disclaimers regarding the use of our cognitive assessments and information.',
  },
  '/contact': {
    title: 'Contact Us | IQ Checker XYZ',
    description: 'Get in touch with the IQ Checker XYZ team for feedback, inquiries, or support.',
  },
  '/dmca': {
    title: 'DMCA Policy | IQ Checker XYZ',
    description: 'Our Digital Millennium Copyright Act policy and contact information for copyright matters.',
  },
};

// Default metadata for blog posts
BLOG_SLUGS.forEach(slug => {
  METADATA[`/blog/${slug}`] = {
    title: `${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} | IQ Checker XYZ`,
    description: `Read our deep dive into ${slug.replace(/-/g, ' ')}. Comprehensive analysis and expert insights from IQ Checker XYZ.`,
  };
});

const APP_URL = 'http://localhost:5173';
const DIST_DIR = path.resolve(process.cwd(), 'dist');
const BASE_DOMAIN = 'https://iqcheckerxyz.compresspdfto200kb.online';

async function generate() {
  console.log('--- Phase 1: Building the project ---');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('--- Phase 2: Starting preview server ---');
  const preview = spawn('npm', ['run', 'preview'], { shell: true });

  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 5000));

  console.log('--- Phase 3: Rendering static pages ---');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  for (const route of ALL_ROUTES) {
    console.log(`Rendering: ${route}`);
    await page.goto(`${APP_URL}${route}`, { waitUntil: 'networkidle0' });

    // Extract HTML
    let content = await page.content();

    // Inject Metadata
    const meta = METADATA[route] || METADATA['/'];
    const titleTag = `<title>${meta.title}</title>`;
    const descriptionTag = `<meta name="description" content="${meta.description}">`;
    const canonicalLink = `<link rel="canonical" href="${BASE_DOMAIN}${route === '/' ? '' : route}">`;

    // Replace original head tags or inject if missing
    content = content.replace(/<title>.*?<\/title>/, titleTag);
    // Remove existing description if any and add new one
    content = content.replace(/<meta name="description" content=".*?">/, '');
    content = content.replace('</head>', `${descriptionTag}\n  ${canonicalLink}\n</head>`);

    // Prepare directory
    const dir = path.join(DIST_DIR, route === '/' ? '' : route);
    await fs.ensureDir(dir);

    // Save index.html
    await fs.writeFile(path.join(dir, 'index.html'), content);
  }

  await browser.close();
  preview.kill();

  console.log('--- Phase 4: Generating sitemap & robots.txt ---');
  generateExtras();

  console.log('--- SSG SUCCESS! ---');
  process.exit(0);
}

function generateExtras() {
  // Sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ALL_ROUTES.map(route => `  <url>
    <loc>${BASE_DOMAIN}${route === '/' ? '' : route}</loc>
    <changefreq>${route.startsWith('/blog/') ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : (route.startsWith('/blog') ? '0.8' : '0.5')}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);

  // Robots.txt
  const robots = `User-agent: *
Allow: /
Sitemap: ${BASE_DOMAIN}/sitemap.xml`;

  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robots);
}

generate().catch(err => {
  console.error('SSG FAILED:', err);
  process.exit(1);
});
