import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { absoluteUrl } from '@/lib/paths';
import { createSitemap } from '@/lib/seo';

export const dynamic = 'force-static';

// O menu lista todas as páginas do site: uma página nova entra no menu e no sitemap juntas.
export default function sitemap(): MetadataRoute.Sitemap {
  return createSitemap({ absoluteUrl }, siteConfig.navigation.map((item) => item.href));
}
