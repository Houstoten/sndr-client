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
import { RequestToast } from './Toast'
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
            // setupConnectionHandler(asReceiver, peer)

            requestFileAcceptAnswer(variables(id, localAccepted))

            dispatch({ type: 'LOCAL_APPROVE_QUERY', payload: { id, localAccepted: null } })
        }

    }, [asReceiver])

    useEffect(() => {

        R.compose(
            R.forEach(({ id, name, sender, size }) => {

                const onAnswerHandler = (answer: boolean) => dispatch({ type: 'LOCAL_APPROVE_QUERY', payload: { id, localAccepted: answer } })

                dispatch({ type: "SET_PENDING_REQUEST", payload: { id, pending: true } })
                toast({
                    id: id,
                    duration: null,
                    // eslint-disable-next-line react/display-name
                    render: ({ onClose }) => (
                        <RequestToast onAnswerHandler={(answer: boolean) => {
                            onAnswerHandler(answer)
                            onClose()
                        }} name={name} sender={sender} size={size} />
                    ),
                    isClosable: true,
                })
            }),
            R.reject(
                R.anyPass([
                    R.compose(toast.isActive, R.prop("id")),
                    R.propEq("accepted", true),
                    R.propEq("accepted", false),
                    R.propEq("pending", true)
                ]))
        )(asReceiver)

    }, [asReceiver])

    useEffect(() => {

        const asyncFunc = async () => {
            const toSend = R.compose(
                R.head,
                R.filter(R.propEq("accepted", true))
            )(asSender)

            if (!toSend) return

            const { receiverid, id } = toSend

            const connection = await peer.connect(receiverid, {
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

        }

        asyncFunc()

    }, [asSender])

    return children
}