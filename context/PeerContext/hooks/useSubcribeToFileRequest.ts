import { gql, useSubscription } from "@apollo/client"
import { PeerContext } from "../PeerContext";
import { useContext, useEffect } from 'react'

const FILE_REQUEST_SUBSCRIPTION = gql`
subscription{
    subscribeToFileRequest{
        id,
        senderid,
        receiverid,
        name,
        size,
        accepted  
    }
  }
`
export const useSubscribeToFileRequest = () => {
    const { dispatch } = useContext(PeerContext)

    const { error, data } = useSubscription(FILE_REQUEST_SUBSCRIPTION);

    const { subscribeToFileRequest } = data ?? {}

    useEffect(() => {

        if (data) {
            dispatch({type: "RECEIVED_QUERY", payload: subscribeToFileRequest})
        }

    }, [data])

}