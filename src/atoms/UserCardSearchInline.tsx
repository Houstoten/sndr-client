import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

export const UserCardSearchInline = ({ id, image, name, email, online }: { id: string, image: string, name: string, email: string, online: boolean }) => {
    const router = useRouter()

    return <Flex align="center" cursor={online && "pointer"} onClick={() => online && router.push(`/user/send/${id}`)}>
        <Avatar
            w="35px"
            h="35px"
            mr="16px"
            src={image}
            _after={online ? {
                content: '""',
                w: "10px",
                h: "10px",
                bg: '#0abf06',
                border: '1px solid white',
                rounded: 'full',
                pos: 'absolute',
                bottom: "1px",
                right: "1px",
            } : {}}
        />
        <Text fontWeight="700" mr="9px" fontSize="12px">{name}</Text>
        &#9679;
        <Text ml="10px" fontSize="12px">{email}</Text>
    </Flex>
}