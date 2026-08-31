/** @type {import('next').NextConfig} */
const nextConfig = {
  // El panel de TinaCMS se compila como sitio estático en /public/admin/.
  // Este rewrite deja que /admin abra ese panel sin escribir /admin/index.html.
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ]
  },
}

export default nextConfig
