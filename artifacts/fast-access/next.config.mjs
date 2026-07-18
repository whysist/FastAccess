// BASE_PATH injected by Replit artifact system; '/' means root (no prefix needed)
const rawBase = process.env.BASE_PATH ?? '';
const basePath = rawBase === '/' ? '' : rawBase.replace(/\/$/, '');

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
