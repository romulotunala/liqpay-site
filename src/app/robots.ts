import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/paths';
import { createRobots } from '@/lib/seo';

export const dynamic = 'force-static';

// Em subpasta (GitHub Pages sem domínio próprio) os buscadores não leem este arquivo; ele passa
// a valer quando o site tiver domínio. Até lá, o sitemap vai pelo Search Console.
export default function robots(): MetadataRoute.Robots {
  return createRobots({ absoluteUrl });
}
