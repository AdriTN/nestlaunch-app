import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Permite importar desde el workspace shared sin problemas
  transpilePackages: ['@nestlaunch/shared'],
};

export default nextConfig;
