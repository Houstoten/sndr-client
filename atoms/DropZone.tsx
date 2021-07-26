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
            py={12}>
            <Stack
                boxShadow={'2xl'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                p={10}
                spacing={8}
                align={'center'}
                {...getRootProps()}>
                <Stack align={'center'} spacing={2} padding={20}>
                    <Heading
                        textTransform={'uppercase'}
                        fontSize={'2xl'}
                        color={useColorModeValue('gray.800', 'gray.200')}>
                        Click here to select files to send
                    </Heading>
                    <Input
                        type={'text'}
                        color={useColorModeValue('gray.800', 'gray.200')}
                        bg={useColorModeValue('gray.100', 'gray.600')}
                        rounded={'full'}
                        border={0}
                        _focus={{
                            bg: useColorModeValue('gray.200', 'gray.800'),
                            outline: 'none',
                        }}
                        {...getInputProps()}
                    />
                </Stack>
            </Stack>
        </Flex>
    );


}