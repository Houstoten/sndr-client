// @ts-nocheck
import '../styles/globals.css'
import 'webrtc-adapter'
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
} from "@apollo/client";
import { ToastWrapper } from '../components/Toasts/ToastWrapper'
import { SubscriptionsProvider } from '../context/SubscriptionsProvider';
import { PersistanceProvider } from '../context/PersistanceContext/PersistanceProvider'
import { ApolloLink, Observable } from "apollo-link";
import { SendToProvider } from '../context/SendToContext/SendToProvider';
import { useRouter } from 'next/router';
import { SignedOut } from '../components/NavBar/SignedOut';
import { Footer } from '../components/Footer/Footer';
import theme from '../theme/theme'
import { errorLink, link } from '../utils/apolloLinks';
import { RefreshTokensDocument } from '../generated/graphql';

let client: ApolloClient

const refreshTokenMutation = () => client.mutate({ mutation: RefreshTokensDocument })

client = new ApolloClient({
  link: ApolloLink.from([errorLink(refreshTokenMutation), link]),
  cache: new InMemoryCache()
});

const peerOptions = {
  host: 'peer-server-sndr.herokuapp.com',
  port: 443,
  secure: true
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
                    <Footer />
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
