//@ts-nocheck
import { Box, Button, Heading, useToast } from "@chakra-ui/react"
import React, { useContext, useEffect } from "react"
import * as R from 'rambda'
import { PeerContext } from "../../context/PeerContext/PeerContext"
import { usePeerState } from "../../context/PeerContext/hooks/usePeerState"
import { useFileRequestAnswer } from "../../context/PeerContext/hooks/useFileRequestAnswer"
import { usePersistance } from "../../context/PersistanceContext/hooks/usePersistance"
import { useCurrentPeer } from "../../context/PeerContext/hooks/useCurrentPeer"
import { useSetupPeerConnection } from "../../context/PeerContext/hooks/useSetupPeerConnection"

export const ToastWrapper = ({ children }: any) => {
    const toast = useToast()

    const { asReceiver, asSender } = usePeerState()

    const peer = useCurrentPeer()

    const setupConnectionHandler = useSetupPeerConnection()

    const { requestFileAcceptAnswer } = useFileRequestAnswer()

    const { dispatch } = useContext(PeerContext)

    const db = usePersistance()

    const variables = (id, answer) => ({ variables: { input: { id, accepted: answer } } });

    useEffect(() => {
        const { id, localAccepted } = R.find(R.compose(R.not, R.isNil, R.prop('localAccepted')))(asReceiver) ?? {}

        if (id) {
            setupConnectionHandler(asReceiver, peer)

            requestFileAcceptAnswer(variables(id, localAccepted))
            
            dispatch({ type: 'LOCAL_APPROVE_QUERY', payload: { id, localAccepted: null } })
        }

    }, [asReceiver])

    useEffect(() => {

        R.compose(
            R.forEach(({ senderid, id, name, size }) => {

                dispatch({ type: "SET_PENDING_REQUEST", payload: { id, pending: true } })
                toast({
                    id: id,
                    // eslint-disable-next-line react/display-name
                    render: () => (
                        <Box p={3} bg="blue.500">
                            <Heading> {senderid} wants to send you {name} with size {size} bytes</Heading>
                            <Button onClick={() => dispatch({ type: 'LOCAL_APPROVE_QUERY', payload: { id, localAccepted: true } })}>Accept</Button>
                            <Button onClick={() => dispatch({ type: 'LOCAL_APPROVE_QUERY', payload: { id, localAccepted: false } })}>Reject</Button>
                        </Box>
                    ),
                    isClosable: true,
                })
            }),
            R.reject(
                R.anyPass([
                    R.compose(toast.isActive, R.prop("id")),
                    R.propEq("accepted", true),
                    R.propEq("pending", true)
                ]))
        )(asReceiver)

    }, [asReceiver])

    useEffect(() => {

        const asyncFunc = async () => {
            R.compose(
                R.forEach(({ receiverid, id }) => {

                    const connection = peer.connect(receiverid, {
                        metadata: {
                            id,
                        },
                        reliable: true,
                    });

                    connection.on('open', async () => {

                        const { file } = await db.table("files").get({ id })

                        connection.send(file)

                        dispatch({ type: "REMOVE_SENDER_REQUEST", payload: { id } })

                        db.table("files").delete(id)
                    })

                }),
                R.filter(R.propEq("accepted", true))
            )(asSender)

        }

        asyncFunc()

    }, [asSender])

    return children
}