import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { SitemapStream, streamToPromise } from 'sitemap';

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/iq-test', changefreq: 'weekly', priority: 0.9 },
  { url: '/reaction-test', changefreq: 'weekly', priority: 0.8 },
  { url: '/mental-age-test', changefreq: 'weekly', priority: 0.8 },
  { url: '/username-iq-checker', changefreq: 'weekly', priority: 0.7 },
  { url: '/blog', changefreq: 'daily', priority: 0.7 },
  { url: '/about-us', changefreq: 'monthly', priority: 0.5 },
  { url: '/privacy-policy', changefreq: 'monthly', priority: 0.3 },
  { url: '/terms', changefreq: 'monthly', priority: 0.3 },
  { url: '/disclaimer', changefreq: 'monthly', priority: 0.3 },
  { url: '/contact', changefreq: 'monthly', priority: 0.5 },
  { url: '/dmca', changefreq: 'monthly', priority: 0.3 },
];

async function generateSitemap() {
  try {
    const smStream = new SitemapStream({ hostname: 'https://iqcheckerxyz.compresspdfto200kb.online' });
    
    // Add links to stream
    links.forEach(link => smStream.write(link));
    smStream.end();

    const sitemap = await streamToPromise(smStream);
    writeFileSync(resolve(process.cwd(), 'public/sitemap.xml'), sitemap.toString());
    console.log('Sitemap generated successfully!');
  } catch (err) {
    console.error('Error generating sitemap:', err);
  }
}

generateSitemap();
