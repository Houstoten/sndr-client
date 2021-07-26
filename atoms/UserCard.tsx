import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    useColorModeValue,
    Flex,
} from '@chakra-ui/react';
import React from 'react';

export const UserCard = ({ image, name, email, distance, onClick, online, badgeColor = "#71bfbc" }: any) => {
    return (
        <Flex
            w='500px'
            minH="100px"
            maxH="100px"
            background="white"
            boxShadow="0 0 7px rgba(99, 178, 209, 0.25)"
            borderRadius="10px"
            textAlign={'center'}
            alignItems="center"
            transition="all .3s ease">
            <Avatar
                boxSize="56px"
                src={image}
                ml="20px"
                pos={'relative'}
                _after={(online || !!distance) ? {
                    content: '""',
                    w: "13px",
                    h: "13px",
                    bg: '#0abf06',
                    border: '1px solid white',
                    rounded: 'full',
                    pos: 'absolute',
                    bottom: "3px",
                    right: "3px",
                } : {}}
            />
            <Flex ml="25px" pt="13px" pb="13px" h="100%" textAlign="start" direction="column">
                <Text fontSize="16px" fontWeight="700">
                    {name}
                </Text>
                <Text fontSize="12px">
                    {email}
                </Text>

                {distance && <Badge
                    h="20px"
                    w="fit-content"
                    p="0 10px"
                    mt="auto"
                    bg={badgeColor}
                    textTransform="none"
                    textAlign="center"
                    alignItems="center"
                    fontSize="11px"
                    borderRadius="5px"
                    color="white"
                    display="inline-flex"
                    justifyContent="center"
                    fontWeight="700">
                    {`${distance >= 1 ? (Math.floor(distance * 100) / 100) + " km" : (Math.floor(distance * 100000) / 100) + " m"} from you`}
                </Badge>}
            </Flex>
            <Button
                mr="20px"
                h="36px"
                w="130px"
                borderRadius="18px"
                onClick={onClick}
                rounded={'full'}
                ml="auto"
                color={'white'}
                fontWeight="700"
                fontSize="14px"
                background="#5794e0"
                _hover={{
                    background: "#367acc"
                }}
                _focus={{
                    boxShadow: "none !important",
                    background: "#5794e0 !important"
                }}
            >
                Send file
            </Button>
        </Flex>
    );
}
