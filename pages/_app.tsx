//@ts-nocheck
 '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NavBar } from "../components/NavBar/NavBar";
import { ChakraProvider } from "@chakra-ui/react";
import React from 'react';
import { GoogleAuthProvider } from '../context/AuthContext/AuthProvider';
import { PeopleAroundProvider } from '../context/PeopleAroundContext/PeopleAroundProvider';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split
} from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { isServer } from '../utils/isServer';

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

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }: AppProps) {
  return <ApolloProvider client={client}>

    <GoogleAuthProvider>
      <PeopleAroundProvider>
        <ChakraProvider>
          <NavBar />
          <Component {...pageProps} />
        </ChakraProvider>
      </PeopleAroundProvider>
    </GoogleAuthProvider>
  </ApolloProvider>
}

export default MyApp
