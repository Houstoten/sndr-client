import React, { FC, useContext } from "react";
import { NavLink } from "../../atoms/NavLink";
import { Flex } from "@chakra-ui/layout";
import { useGoogleAuth } from "../../context/AuthContext/hooks/useGoogleAuth";

export const SignedOut: FC = () => {

    const {signIn} = useGoogleAuth();

    return (<Flex alignItems={'center'}>
        {/*@ts-ignore*/}
        <NavLink onClick={() => signIn()}>Sign in</NavLink>
    </Flex>)
}
