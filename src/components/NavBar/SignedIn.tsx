import React, { FC } from "react";
import { Flex } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from "@chakra-ui/menu";
import { Avatar } from "@chakra-ui/avatar";
import { useSignOut } from "../../context/AuthContext/hooks/useSignOut";

interface SignedInProps {
    email: string | null | undefined,
    image: string | null | undefined,
    name: string | null | undefined
}

export const SignedIn: FC<SignedInProps> = ({
    email,
    image,
    name
}) => {

    const { signOut } = useSignOut()

    return <Flex alignItems={'center'}>

        <Menu placement="bottom-end" autoSelect={false}>
            <Text
                fontFamily="Noto Sans" fontSize="14px" fontWeight="700" pr="12px" >Hello, {name}!</Text>
            <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                _focus={{
                    boxShadow: "none !important"
                }}>
                <Avatar
                    w="38px"
                    h="38px"
                    src={image}
                />
            </MenuButton>
            <MenuList>
                <MenuItem fontSize="14px" onClick={() => signOut()}>Sign out</MenuItem>
            </MenuList>
        </Menu>
    </Flex>


}
