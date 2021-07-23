// import {
//     Box,
//     Center,
//     useColorModeValue,
//     Heading,
//     Text,
//     Stack,
//     Image,
// } from '@chakra-ui/react';

// export const UserCard = ({ image, name, email, distance, onClick }: any) => 
//     <Box
//         onClick={onClick}
//         role={'group'}
//         p={6}
//         maxW={'330px'}
//         bg={useColorModeValue('white', 'gray.800')}
//         boxShadow={'2xl'}
//         rounded={'lg'}
//         pos={'relative'}
//         zIndex={1}>
//         <Box
//             rounded={'lg'}
//             mt={-12}
//             pos={'relative'}
//             height={'230px'}
//             _after={{
//                 transition: 'all .3s ease',
//                 content: '""',
//                 w: 'full',
//                 h: 'full',
//                 pos: 'absolute',
//                 top: 5,
//                 left: 0,
//                 backgroundImage: `url(${image})`,
//                 filter: 'blur(15px)',
//                 zIndex: -1,
//             }}
//             _groupHover={{
//                 _after: {
//                     filter: 'blur(20px)',
//                 },
//             }}>
//             <Image
//                 rounded={'lg'}
//                 height={'100%'}
//                 width={'100%'}
//                 objectFit={'cover'}
//                 src={image}
//             />
//         </Box>
//         <Stack pt={10} align={'center'}>
//             <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
//                 {email}
//             </Text>
//             <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
//                 {name}
//             </Heading>
//             <Stack direction={'row'} align={'center'}>
//                 <Text fontWeight={800} fontSize={'xl'}>
//                     {distance !== null ? `${Math.floor(distance * 100) / 100} degrees from you :)` : 'Are you the same person???'}
//                 </Text>
//             </Stack>
//         </Stack>
//     </Box>


////////////////////////////////


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

export const UserCard = ({ image, name, email, distance, onClick }: any) => {
    return (
        <Box
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={'lg'}
            p={6}
            textAlign={'center'}
            transition="all .3s ease"
            _hover={{
                boxShadow:'none'
            }}>
            <Flex direction="row" align="center">

                <Avatar
                    size={'xl'}
                    src={image}
                    mb={4}
                    mr={10}
                    pos={'relative'}
                    _after={{
                        content: '""',
                        w: 4,
                        h: 4,
                        bg: 'green.300',
                        border: '2px solid white',
                        rounded: 'full',
                        pos: 'absolute',
                        bottom: 0,
                        right: 3,
                    }}
                />
                <Box textAlign="start">
                    <Heading fontSize={'2xl'} fontFamily={'body'}>
                        {name}
                    </Heading>
                    <Text fontWeight={600} color={'gray.500'} mb={4}>
                        {email}
                    </Text>

                    <Badge
                        px={2}
                        py={1}
                        bg={useColorModeValue('gray.50', 'gray.800')}
                        fontWeight={'400'}>
                        {`${Math.floor(distance * 100) / 100} degrees from you :)`}
                    </Badge>
                </Box>
                <Button
                    flex={1}
                    onClick={onClick}
                    fontSize={'sm'}
                    rounded={'full'}
                    bg={'blue.400'}
                    ml="auto"
                    maxW="30%"
                    p="1.7em"
                    color={'white'}
                    boxShadow={
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                    }
                    _hover={{
                        bg: 'blue.500',
                    }}
                    _focus={{
                        bg: 'blue.500',
                    }}>
                    Send file
                </Button>
            </Flex>

        </Box>
    );
}
