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
            hostname: 'www.nopcommerce.com'
          },
          {
            protocol: 'https',
            hostname: 'cdn.printgo.vn'
          },
          {
            protocol: 'http',
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
          {
            protocol: 'https',
            hostname: 'theme.hstatic.net'
          }, 
          {
            protocol: 'https',
            hostname: 'www.paypalobjects.com'
          }, 
          {
            protocol: 'https',
            hostname: 'img.mservice.io'
          }, 
          {
            protocol: 'https',
            hostname: 'upload.wikimedia.org'
          }, 
          {
            protocol: 'https',
            hostname: 'dummyimage.com'
          }, 
          {
            protocol: 'https',
            hostname: 'scontent.fsgn5-8.fna.fbcdn.net'
          }, 
        ]
    },
    experimental: {
      serverActions: true,
    },
}

module.exports = nextConfig
