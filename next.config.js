module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}/:path*` // Proxy to Backend
      }
    ]
  }

}
