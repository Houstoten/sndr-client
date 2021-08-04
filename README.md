# SENDer-client 🖥️

# Share files seamlessly with people around you using webrtc connection!

Available on [sndr.club](https://sndr.club)

## Technical stack
  - **Typescript, Next.js**
  - **Chakra-ui** (Highly cusotmizable component library)
  - **Apollo-client** (Most popular graphql client)
  - **[Graphql-codegen](https://github.com/dotansimha/graphql-code-generator/)** (Code generation from graphql schema)
  - **[Peerjs-client](https://github.com/peers/peerjs)** (WebRTC client)
  - **[Dexie.js](https://github.com/dfahlander/Dexie.js)** (Minimalistic IndexedDB wrapper)
  - **[Rambda](https://github.com/selfrefactor/rambda)** (Blazing fast functional library)
  
## Authentication 🔒
  - **[Google OpenID](https://developers.google.com/identity/protocols/oauth2)** ([Code flow](https://openid.net/connect/) with Google OpenID specification with httpOnly cookies as transport)
 
## How to Build

- create your own `.env.local` file from `.env.local.example`
- to start the server run `yarn build` and `yarn start`
