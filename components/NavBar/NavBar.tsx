import React, { useContext, useEffect } from "react";
import { Spinner, Link } from "@chakra-ui/react"
import { SignedOut } from "./SignedOut";
import { SignedIn as DefaultSignedIn } from "./SignedIn";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Flex, HStack } from "@chakra-ui/layout";
import { useAuthState } from "../../context/AuthContext/hooks/useAuthState";
import { useCurrentUser } from "../../context/AuthContext/hooks/useCurrentUser";
import Image from 'next/image'

export const NavBar: React.FC = (props: any) => {

    const { SignedIn = DefaultSignedIn } = props
    const { userDetails, loading, signedIn } = useAuthState()

    //@ts-ignore
    const { loadUserData } = useCurrentUser()

    useEffect(() => { loadUserData() }, [signedIn])

    const { email, image, name } = userDetails ?? {}

    return (
        <Flex
            justifyContent="center"
            position='sticky'
            top='0'
            zIndex={1000}
            bg="linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(235,248,255,1) 50%, rgba(206,237,250,1) 100%)"
            minH="100px"
            maxH="100px"
            h="100px"
            boxShadow="0 15px 10px rgba(255,255,255,1)">
            <Flex h={16} alignItems={'center'} height="100%" justifyContent={'space-between'} w="1140px">
                <HStack spacing={8} alignItems={'center'}>
                    <Link href='/'
                        _focus={{
                            boxShadow: "none !important"
                        }}>
                        <Image src="/logo.svg" width="114px" height="40px" />
                    </Link>
                </HStack>
                {loading && <Spinner />}
                {!signedIn && !loading && <SignedOut />}
                {signedIn && !loading && <SignedIn email={email} image={image} name={name} />}
            </Flex>
        </Flex>
    );
};
