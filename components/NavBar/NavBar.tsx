import React, { useContext, useEffect } from "react";
import { Image, Spinner, Button, Heading, Link } from "@chakra-ui/react"
import { SignedOut } from "./SignedOut";
import { SignedIn } from "./SignedIn";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Flex, HStack } from "@chakra-ui/layout";
import { useGoogleAuth } from "../../context/AuthContext/hooks/useGoogleAuth";

export const NavBar: React.FC = () => {
    const { userDetails, loading, loadUserData, refreshedTokensFirst, errorMessage, signedIn } = useGoogleAuth();

    useEffect(() => { loadUserData() }, [])

    useEffect(() => {
        if (errorMessage?.response?.status === 401) {
            refreshedTokensFirst(loadUserData)
        }
    }, [errorMessage?.response?.status])

    const { email, image, name } = userDetails ?? {}

    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
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
