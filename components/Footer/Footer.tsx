import { Flex, Text, Link } from "@chakra-ui/react"
import React from "react"
import Image from 'next/image'
import NextLink from "next/link"
//70 top

//icon to text 20

export const Footer = () => {
    return <Flex justify="center" align="center" mt="auto" position="relative" minH="130px" maxH="130px" width="100%">
        <Flex zIndex="100" direction="column">
            <Text display="flex"
                mb="15px"
                fontFamily="Noto Sans"
                fontSize="14px"
                fontWeight="400"
                color="#a8a7a7">
                Created by
                <Link href="https://github.com/Houstoten"
                    _focus={{
                        boxShadow: "none !important"
                    }}>
                    <Text pl="0.25em" color="#041820">Houstoten</Text>
                </Link>
            </Text>
            <Flex justify="center">
                <Link href="https://github.com/Houstoten"
                    _focus={{
                        boxShadow: "none !important"
                    }}
                    rounded="full"
                >
                    <Image src="/github-icon.svg" width="28px" height="28px" />
                </Link>
            </Flex>
        </Flex>
        <Image src="/footer.svg" layout="fill" />
    </Flex>
}