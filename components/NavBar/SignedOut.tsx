import React, { FC, useContext } from "react";
import { NavLink } from "../../atoms/NavLink";
import { Flex } from "@chakra-ui/layout";
import { useSignIn } from "../../context/AuthContext/hooks/useSignIn";

export const SignedOut: FC = () => {

    const { signIn } = useSignIn();

    return (<Flex alignItems={'center'}>
        {/*@ts-ignore*/}
        <NavLink onClick={() => signIn()}>Sign in</NavLink>
    </Flex>)
}
