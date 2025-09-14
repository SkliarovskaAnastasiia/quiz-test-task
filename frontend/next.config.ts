import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  outputFileTracingRoot: path.join(__dirname, 'frontend'),
};

export default nextConfig;
