import React, { useContext, useEffect } from "react";
import { Image, Spinner, Button, Heading, Link } from "@chakra-ui/react"
import { SignedOut } from "./SignedOut";
import { SignedIn } from "./SignedIn";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Flex, HStack } from "@chakra-ui/layout";
import { useAuthState } from "../../context/AuthContext/hooks/useAuthState";
import { useCurrentUser } from "../../context/AuthContext/hooks/useCurrentUser";

export const NavBar: React.FC = () => {
    const { userDetails, loading, errorMessage, signedIn, refreshedTokens } = useAuthState()
    
    //@ts-ignore
    const { loadUserData } = useCurrentUser()

    useEffect(() => {loadUserData()}, [])

    useEffect(() => {        
        if (!loading && signedIn) {
            if (!errorMessage || (errorMessage?.response?.status === 401 && refreshedTokens)){
                loadUserData()
            }
        }
    }, [refreshedTokens, errorMessage, loading, signedIn])

    const { email, image, name } = userDetails ?? {}

    return (
        <Box position='sticky' top='0' zIndex={1000} bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <HStack spacing={8} alignItems={'center'}>
                    <Link href='/'>
                        <Heading size="md">Throw me some numbers</Heading>
                    </Link>
                    {/*<HStack*/}
                    {/*    as={'nav'}*/}
                    {/*    spacing={4}*/}
                    {/*    display={{ base: 'none', md: 'flex' }}>*/}
                    {/*    {Links.map((link) => (*/}
                    {/*        <NavLink key={link}>{link}</NavLink>*/}
                    {/*    ))}*/}
                    {/*</HStack>*/}
                </HStack>
                {loading && <Spinner />}
                {!signedIn && !loading && <SignedOut />}
                {signedIn && !loading && <SignedIn email={email} image={image} name={name} />}
            </Flex>
        </Box>
    );
};
