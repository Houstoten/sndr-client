module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4000/graphql/:path*' // Proxy to Backend
      }
    ]
  }

}
