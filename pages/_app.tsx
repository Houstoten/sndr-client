import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NavBar } from "../components/NavBar/NavBar";
import { ChakraProvider } from "@chakra-ui/react";
import React from 'react';
import { GoogleAuthProvider } from '../context/AuthContext/AuthProvider';
import { GoogleLogin } from 'react-google-login';


function MyApp({ Component, pageProps }: AppProps) {
    return <GoogleAuthProvider>
        <ChakraProvider>
            <NavBar />
            <Component {...pageProps} />
        </ChakraProvider>
    </GoogleAuthProvider>
}

export default MyApp
