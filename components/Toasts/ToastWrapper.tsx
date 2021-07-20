import { Box, Button, Heading, useToast } from "@chakra-ui/react"
import React, { useContext, useEffect } from "react"
import { useCurrentConnections } from "../../context/PeerContext/hooks/useCurrentConnections"
import * as R from 'rambda'
import { PeerContext } from "../../context/PeerContext/PeerContext"

export const ToastWrapper = ({ children }: any) => {
    const toast = useToast()

    const { connectionsWithMetadata } = useCurrentConnections()

    const { dispatch } = useContext(PeerContext)

    useEffect(() => {
        R.map(R.prop('metadata'), connectionsWithMetadata).forEach(
            ({ files, id }: any) => {
                const { name, size } = files[0]

                !toast.isActive(id) && toast({
                    id: id,
                    // eslint-disable-next-line react/display-name
                    render: () => (
                        <Box color="white" p={3} bg="blue.500">
                            <Heading> {id} wants to send you {name} which weight is {size} bytes</Heading>
                            <Button onClick={() => dispatch({ type: "SET_REACTION", payload: {id, accepted: true } })}>Accept</Button>
                            <Button onClick={() => dispatch({ type: "SET_REACTION", payload: {id, accepted: false } })}>Reject</Button>
                        </Box>
                    ),
                    isClosable: true,
                })
            }
        );


    }, [connectionsWithMetadata])
    return children
}