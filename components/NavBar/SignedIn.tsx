import React, { FC } from "react";
import { Flex } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";
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

        <Menu>
            <Heading size={'sm'} m={2}>Hello, {name}!</Heading>
            <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}>
                <Avatar
                    size={'sm'}
                    src={image}
                />
            </MenuButton>
            <MenuList>
                <MenuGroup title={'Profile'}>
                    <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    </Flex>


}
