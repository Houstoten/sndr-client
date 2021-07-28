import { Avatar, Box, Flex, useColorModeValue, Text, IconButton } from "@chakra-ui/react";
import React from "react";
import { CloseCircleOutlineIcon, CheckmarkCircleOutlineIcon } from 'chakra-ui-ionicons';
const byteSize = require('byte-size')

export const RequestToast = (props: { onAnswerHandler: any, sender: { name: string, image: string }, name: string, size: number }) => {
    const { onAnswerHandler, sender, name, size } = props

    const { name: senderName, image } = sender

    return <Box
        h='auto'
        w="30em"
        minW="fit-content"
        p='3'
        bg={useColorModeValue('white', 'gray.900')}
        rounded={'lg'}
        transition="all .3s ease"
    >
        <Flex direction="row" align="center" h="100%">
            <Avatar
                size='sm'
                src={image}
                mr={4}
                pos={'relative'}
            />
            <Flex flexDir="column" justify="space-between" h="100%" w="100%">
                <Text fontWeight={600} color={'gray.500'}>
                    I want to send you {name} | {byteSize(size).toString()}
                </Text>
                <Flex direction="row" align="center" justify="space-between">
                    <Text fontWeight={'bold'} color={'gray.500'}>
                        {senderName}
                    </Text>

                    <Box>
                        <IconButton variant="unstyled" aria-label="Accept" onClick={() => onAnswerHandler(true)}
                            icon={<CheckmarkCircleOutlineIcon color="green.600" w={7} h={7} />} />
                        <IconButton variant="unstyled" aria-label="Reject" onClick={() => onAnswerHandler(false)}
                            icon={<CloseCircleOutlineIcon color="red.600" w={7} h={7} />} />
                    </Box>
                </Flex>
            </Flex>

        </Flex>
    </Box>
}