/** @type {import('next').NextConfig} */
const nextConfig = {
    images: { 
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com'
          },
          {
            protocol: 'https',
            hostname: 'demo.vercel.store'
          }, 
          {
            protocol: 'https',
            hostname: 'bizweb.dktcdn.net'
          }, 
        ]
    },
    experimental: {
      serverActions: true,
    },
}

module.exports = nextConfig
