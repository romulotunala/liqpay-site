import type { NextConfig } from 'next';
import { basePath } from './src/config/url';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
