/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: true, },
     images: {
      domains: [
        "legamart.com","images.unsplash.com" ,"plus.unsplash.com", "www.esi-sba.dz" ,"firebasestorage.googleapis.com", "static.vecteezy.com"
       
      ],
    },
   
}

module.exports = nextConfig
