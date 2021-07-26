import { useRouter } from 'next/router'
import React, { useCallback, useContext, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useAuthState } from '../../../context/AuthContext/hooks/useAuthState'
import { PeerContext } from '../../../context/PeerContext/PeerContext'
import * as R from 'rambda'
import { DropZone } from '../../../atoms/DropZone'
import { useFileRequest } from '../../../context/PeerContext/hooks/useFileRequest'
import { usePersistance } from '../../../context/PersistanceContext/hooks/usePersistance'
import { useRecentSentFiles } from '../../../context/SendToContext/hooks/useRecentSentFiles'
import { useUserSendTo } from '../../../context/SendToContext/hooks/useUserSendTo'
import { Avatar, Box, Flex, Heading, Text } from '@chakra-ui/react'
import { FileRequest } from '../../../context/PeerContext/reducer/reducer'
const byteSize = require('byte-size')

const SendToUser = () => {
    const router = useRouter()

    const { sendToUser, loadUserById } = useUserSendTo()

    const { name, email, image } = sendToUser ?? {}
    const { recentFiles, loadRecentFiles } = useRecentSentFiles()

    const { id } = router.query

    useEffect(() => {
        if (!R.isEmpty(id)) {
            loadUserById({ variables: { input: { id } } })
            loadRecentFiles({ variables: { input: { id } } })
        }
    }, [id])

    const db = usePersistance()

    const { requestFileAccept } = useFileRequest()

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const variables = { input: { receiverid: id, ...R.pick(['name', 'size'], acceptedFiles[0]) } };

        requestFileAccept({ variables }).then(({ data: { requestFileAccept } }: any) => {

            const { id } = requestFileAccept

            db.table("files").add({ id, file: new Blob([acceptedFiles[0]], { type: acceptedFiles[0].type }) }, [id])
        })
    }, [id])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return <Flex direction="row" mt="50px" align="center" justify="space-around">
        <Flex direction="column" justify="space-between">
            <Flex direction="row" align="center">

                <Avatar
                    size={'xl'}
                    src={image}
                    mb={4}
                    mr={10}
                    pos={'relative'}
                />
                <Box textAlign="start">
                    <Heading fontSize={'2xl'} fontFamily={'body'}>
                        {name}
                    </Heading>
                    <Text fontWeight={600} color={'gray.500'} mb={4}>
                        {email}
                    </Text>
                </Box>
            </Flex>

            <Flex h="300px"
                style={{ gap: "15px" }}
                w="500px"
                overflowY="auto"
                p="7px"
                direction="column"
                className="customScrollbar"
            >
                {/*/@ts-ignore*/}
                {recentFiles.filter(R.compose(R.not, R.isNil, R.prop('accepted'))).map((fileRequest: FileRequest) => {
                    const { id: fileRequestid, senderid, name, size, updatedat } = fileRequest

                    return <Flex key={fileRequestid} h="100px" background="white"
                        boxShadow="0 0 7px rgba(99, 178, 209, 0.25)"
                        borderRadius="10px"
                        textAlign={'center'}
                        alignItems="center"
                        transition="all .3s ease"
                        p="5px">
                        <Text fontSize="14px">You {senderid === id ? "received" : "sent"} <b>{name}</b> | {byteSize(size).toString()} at {updatedat} </Text>
                    </Flex>
                })}
            </Flex>
        </Flex>

        <DropZone getInputProps={getInputProps} getRootProps={getRootProps} />
    </Flex>

}

export default SendToUser