import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Image from 'next/image'
import { useSignIn } from "../context/AuthContext/hooks/useSignIn";
import { getServerSideAuth } from "../utils/serverSideAuthChecker";

export const getServerSideProps = getServerSideAuth('/', false)

export default function Hello() {

    const { signIn } = useSignIn();

    const [hovered, setHovered] = useState(false);

    return <Flex mt="60px" justifyContent="center">
        <Flex w="1280px" ml="140px">
            <Box mt="50px" width="550px">
                <Text fontSize="40px" fontWeight="700" lineHeight="50px">Share files directly<br /> with people around you</Text>
                <Text mt="23px" fontSize="16px">Transfer files without intermediaries and cloud storages</Text>
                <Button mt="35px"
                    w="260px"
                    h="52px"
                    borderRadius="10px"
                    background="#fff"
                    _before={{
                        content: '""',
                        position: "absolute",
                        top: "-3px",
                        bottom: "-3px",
                        left: "-3px",
                        right: "-3px",
                        borderRadius: "13px",
                        background: "linear-gradient(rgba(33,99,131,1) 0%, rgba(54,124,157,1) 50%, rgba(113,191,188,1) 100%)",
                        zIndex: -1
                    }}
                    _hover={{
                        background: "transparent"
                    }}
                    _focus={{
                        boxShadow: "none !important"
                    }}
                    _active={{
                        background: "transparent !important"
                    }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onClick={signIn}
                >
                    <Text fontWeight="700"
                        fontSize="17px"
                        style={{
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: hovered ? "white" : "transparent"
                        }}
                        background="linear-gradient(rgba(33,99,131,1) 0%, rgba(54,124,157,1) 50%, rgba(113,191,188,1) 100%)"
                    >Start sharing files</Text>
                </Button>
            </Box>

            <Image src="/landing-main.svg" height="420px" width="733px" />

        </Flex>
    </Flex>
}