import { useRouter } from 'next/router'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import * as R from 'rambda'
import { DropZone } from '../../../atoms/DropZone'
import { useFileRequest } from '../../../context/PeerContext/hooks/useFileRequest'
import { usePersistance } from '../../../context/PersistanceContext/hooks/usePersistance'
import { useUserSendTo } from '../../../context/SendToContext/hooks/useUserSendTo'
import { Avatar, Box, Button, Flex, Heading, IconButton, Text } from '@chakra-ui/react'
import { getServerSideAuth } from '../../../utils/serverSideAuthChecker'
const byteSize = require('byte-size')
import { CloseIcon } from 'chakra-ui-ionicons';
import JSZip from 'jszip'

const prepareId: (id: string | string[]) => string = (id) => Array.isArray(id) ? id[0] : id

export const getServerSideProps = getServerSideAuth('/hello', true)

const SendToUser = () => {
    const router = useRouter()

    const [files, setFiles] = useState<File[]>([])

    const [hovered, setHovered] = useState(false);

    const { sendToUser, loadUserById } = useUserSendTo()

    const { name, email, image } = sendToUser ?? {}

    const { id } = router.query

    const preparedId = prepareId(id)

    useEffect(() => {
        if (!R.isEmpty(id)) {
            loadUserById({ variables: { input: { id: preparedId } } })
        }
    }, [preparedId])

    const db = usePersistance()

    const { requestFileAccept } = useFileRequest()

    const onDrop = (acceptedFiles: File[]) => {
        setFiles([...files, ...acceptedFiles])
    }

    const createZipOrSingleFile = async (files: File[]) => {

        if (files.length === 1) {
            return files[0]
        }

        const zip = new JSZip()

        files.forEach(file => zip.file(file.name, file))

        const resultBlob = await zip.generateAsync({ type: 'blob' })

        //@ts-ignore
        resultBlob.lastModifiedDate = new Date()
        //@ts-ignore
        resultBlob.name = `${email}.zip`

        return resultBlob as File
    }

    const fileSendHandler = async () => {
        if (files.length === 0) {
            return
        }
        const preparedFile = await createZipOrSingleFile(files)

        const variables = { input: { receiverid: preparedId, ...R.pick(['name', 'size'], preparedFile) } };

        requestFileAccept({ variables }).then(({ data: { requestFileAccept } }: any) => {

            const { id } = requestFileAccept

            return db.table("files").add({ id, file: new Blob([preparedFile], { type: preparedFile.type }) }, [id])
        }).then(() => {
            setFiles([])
        })
    }
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return <Flex justify="center" mt="35px" mb="100px">
        <Flex alignItems="center" w="1140px" justify="center" direction="column">
            <Text fontWeight="700" fontSize="26px" color="#041820">Send files to user</Text>
            <Flex direction="row" mt="60px" align="center" justify="space-between" w="100%">
                <Flex direction="row" align="center" mt="55px" alignSelf="start">

                    <Avatar
                        w="90px"
                        h="90px"
                        src={image}
                        pos={'relative'}
                    />
                    <Box textAlign="start" ml="25px">
                        <Text color="#041820" fontSize="20px" fontWeight="700">{name}</Text>
                        <Text color="#4c4c4c" fontSize="16px">{email}</Text>
                    </Box>
                </Flex>

                <Flex direction="column">
                    <DropZone getInputProps={getInputProps} getRootProps={getRootProps} isDragActive={isDragActive} />

                    <Flex style={{ gap: "8px" }} mt={files.length && "20px"} mb={!files.length ? "30px" : "25px"} direction="column">
                        {files.map(file => <Flex key={file.name + file.size}
                            h="30px"
                            borderRadius="5px"
                            background="#f7f7f7"
                            pl="10px"
                            pr="10px"
                            alignItems="center">
                            <Text fontSize="12px" fontWeight="700" color="#272727">{file.name}</Text>
                            <Text h="100%" display="inline-flex" alignItems="center" ml="15px" fontSize="10px" fontWeight="700" color="#828282">({byteSize(file.size).toString()})</Text>

                            <IconButton
                                ml="auto"
                                height="100%"
                                minWidth="16px"
                                variant="unstyled"
                                aria-label="Delete"
                                color="#272727"
                                _focus={{
                                    boxShadow: "none !important",
                                }}
                                onClick={() => setFiles(R.reject(_file => file.name === _file.name && file.size === _file.size))}
                                icon={<CloseIcon h={5} />} />
                        </Flex>)}
                    </Flex>
                    <Button ml="auto"
                        mr="auto"
                        h="52px"
                        w="300px"
                        cursor={!files.length && "not-allowed"}
                        onClick={fileSendHandler}
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
                            background: `linear-gradient(rgba(33,99,131,${files.length ? 1 : 0.4}) 0%, rgba(54,124,157,${files.length ? 1 : 0.4}) 50%, rgba(113,191,188,${files.length ? 1 : 0.4}) 100%)`,
                            zIndex: -1
                        }}
                        _hover={{
                            background: files.length ? "transparent" : 'white'
                        }}
                        _focus={{
                            boxShadow: "none !important"
                        }}
                        _active={{
                            background: files.length ? "transparent !important" : 'white'
                        }}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <Text fontWeight="700"
                            fontSize="19px"
                            style={{
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: files.length && hovered ? "white" : "transparent"
                            }}
                            background={`linear-gradient(rgba(33,99,131,${files.length ? 1 : 0.4}) 0%, rgba(54,124,157,${files.length ? 1 : 0.4}) 50%, rgba(113,191,188,${files.length ? 1 : 0.4}) 100%)`}
                        >Send files</Text>
                    </Button>

                </Flex>
            </Flex>
        </Flex>
    </Flex>
}

export default SendToUser