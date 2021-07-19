import React, { useContext, useEffect } from "react";
import { Image, Spinner, Button, Heading, Link } from "@chakra-ui/react"
import { SignedOut } from "./SignedOut";
import { SignedIn } from "./SignedIn";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Flex, HStack } from "@chakra-ui/layout";
import { useAuthState } from "../../context/AuthContext/hooks/useAuthState";
import { useCurrentUser } from "../../context/AuthContext/hooks/useCurrentUser";
import { useTokenRefresh } from "../../context/AuthContext/hooks/useTokenRefresh";

export const NavBar: React.FC = () => {
    const { userDetails, loading, errorMessage, signedIn, refreshedTokens } = useAuthState()

    const { refreshTokens } = useTokenRefresh()
    //@ts-ignore
    const { loadUserData } = useCurrentUser()

    useEffect(() => { loadUserData() }, [])

    useEffect(() => {
        if (signedIn && !userDetails) {
            loadUserData()
        }
    }, [userDetails, signedIn])

    useEffect(() => { refreshedTokens && loadUserData() }, [refreshedTokens])

    useEffect(() => {
        if (errorMessage?.graphQLErrors?.[0]?.extensions?.code === 'UNAUTHENTICATED') {
            refreshTokens()
        }
    }, [errorMessage])
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
