import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuthState } from "../context/AuthContext/hooks/useAuthState";

export default function Hello() { 

    const router = useRouter()

    const { signedIn } = useAuthState()

    if(signedIn) {
        router.push('/')
    }

    return <Heading>HELLO ON LANDING</Heading>
 }