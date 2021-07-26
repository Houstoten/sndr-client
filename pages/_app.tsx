//@ts-nocheck
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NavBar } from "../components/NavBar/NavBar";
import { ChakraProvider } from "@chakra-ui/react";
import React from 'react';
import { GoogleAuthProvider } from '../context/AuthContext/AuthProvider';
import { PeopleAroundProvider } from '../context/PeopleAroundContext/PeopleAroundProvider';
import { PeerProvider } from '../context/PeerContext/PeerProvider'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split,
  gql
} from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { isServer } from '../utils/isServer';
import { ToastWrapper } from '../components/Toasts/ToastWrapper'
import { SubscriptionsProvider } from '../context/SubscriptionsProvider';
import { PersistanceProvider } from '../context/PersistanceContext/PersistanceProvider'
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { SendToProvider } from '../context/SendToContext/SendToProvider';
import { useRouter } from 'next/router';
import { SignedOut } from '../components/NavBar/SignedOut';
import { Footer } from '../components/Footer/Footer';
import theme from '../theme/theme'

const REFRESH_TOKENS = gql`
mutation {
    refreshTokens {
      success
    }
  }
`

const httpLink = createHttpLink({
  uri: '/api'
});

const wsLink = !isServer && new WebSocketLink({
  uri: `ws://localhost:4000`
});

const link = !isServer ? split(
  ({ query }) => {
    const { kind, operation }: any = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' &&
      operation === 'subscription'
    );
  },
  wsLink,
  httpLink
) : httpLink;

let client: ApolloClient

const refreshTokenMutation = () => client.mutate({ mutation: REFRESH_TOKENS })

const errorLink = onError(
  ({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case "UNAUTHENTICATED":

            if (err.path[0] === 'refreshTokens') {
              return;
            }

            refreshTokenMutation().then(() => {
              return forward(operation);
            }).catch(() => {
              if (location.pathname !== '/hello') {
                window.location.replace('/')
              }
              return;
            })

        }
      }
    }
  }
);

client = new ApolloClient({
  link: ApolloLink.from([errorLink, link]),
  cache: new InMemoryCache()
});

const peerOptions = {
  host: 'localhost',
  port: 9000,
  path: '/myapp'
}

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter()

  return <ApolloProvider client={client}>
    <PersistanceProvider>
      <GoogleAuthProvider>
        <PeerProvider options={peerOptions}>
          <PeopleAroundProvider>
            <SubscriptionsProvider>
              <SendToProvider>
                <ChakraProvider theme={theme}>
                  <ToastWrapper>
                    <NavBar SignedIn={router.pathname === '/hello' ? SignedOut : undefined} />
                    <Component {...pageProps} />
                    <Footer/>
                  </ToastWrapper>
                </ChakraProvider>
              </SendToProvider>
            </SubscriptionsProvider>
          </PeopleAroundProvider>
        </PeerProvider>
      </GoogleAuthProvider>
    </PersistanceProvider>
  </ApolloProvider>
}

export default MyApp
