import React, { FC, useContext } from "react";
import { NavLink } from "../../atoms/NavLink";
import { Flex } from "@chakra-ui/layout";
import { useSignIn } from "../../context/AuthContext/hooks/useSignIn";
import { Button } from "@chakra-ui/react";

export const SignedOut: FC = () => {

    const { signIn } = useSignIn();

    return (<Flex alignItems={'center'}>
        <Button
            w="180px"
            h="42px"
            fontFamily="Noto Sans"
            fontSize="14px"
            fontWeight="700"
            color="white"
            rounded="21px"
            background="#5794e0"
            _hover={{
                background: "#367acc"
            }}
            _focus={{
                boxShadow: "none !important",
                background: "#5794e0 !important"
            }}
            onClick={signIn}
        >Sign in with Google</Button>
    </Flex>)
}
