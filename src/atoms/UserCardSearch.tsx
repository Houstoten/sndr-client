import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

export const UserCardSearch = ({ id, image, name, email, online }: { id: string, image: string, name: string, email: string, online: boolean }) => {
    const router = useRouter()
    
    return <Flex flexDirection="column"
        alignItems="center"
        w="70px"
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
        cursor={online && "pointer"}
        onClick={() => online && router.push(`/user/send/${id}`)}>
        <Avatar
            w="50px"
            h="50px"
            src={image}
            _after={online ? {
                content: '""',
                w: "11px",
                h: "11px",
                bg: '#0abf06',
                border: '1px solid white',
                rounded: 'full',
                pos: 'absolute',
                bottom: "2px",
                right: "2px",
            } : {}}
        />
        <Text pl="10px" pr="10px" fontWeight="700" fontSize="12px" color="#041820" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" width="100%" textAlign="center">{name}</Text>
        <Text fontSize="10px" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" width="100%" textAlign="center">{email}</Text>
    </Flex>
}