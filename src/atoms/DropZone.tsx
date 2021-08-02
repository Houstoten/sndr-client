import {
    Flex,
    Stack,
    Heading,
    Text,
    Input,
    Button,
    Icon,
    useColorModeValue,
    createIcon,
} from '@chakra-ui/react';

export const DropZone = ({ getRootProps, getInputProps, isDragActive }: any) => {
    return (
        <Flex
            cursor="pointer"
            align={'center'}
            justify={'center'}
            w="540px"
            h="200px"
            boxShadow="0 0 14px rgba(99, 178, 209, 0.25)"
            borderRadius="10px"
            {...getRootProps()}>
            <input {...getInputProps()} />
            <Text fontWeight="700" fontSize="20px" color="#b5b5b5">CLICK HERE TO SELECT FILES</Text>
        </Flex>
    );


}