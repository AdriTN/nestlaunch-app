/** @type {import('next').NextConfig} */
const nextConfig = {
  // Permite importar desde el workspace shared sin problemas
  transpilePackages: ['@nestlaunch/shared'],
};

export default nextConfig;
