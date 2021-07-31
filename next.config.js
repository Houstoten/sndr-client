module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.sndr.club/graphql/:path*' // Proxy to Backend
      }
    ]
  }

}
