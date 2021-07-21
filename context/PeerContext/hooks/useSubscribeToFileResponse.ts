import { gql, useSubscription } from "@apollo/client"
import { PeerContext } from "../PeerContext";
import { useContext, useEffect } from 'react'

const FILE_RESPONSE_SUBSCRIPTION = gql`
subscription{
    subscribeToFileResponse{
        id,
        accepted  
    }
  }
`
export const useSubscribeToFileResponse = () => {
    const { dispatch } = useContext(PeerContext)

    const { error, data } = useSubscription(FILE_RESPONSE_SUBSCRIPTION);

    const { subscribeToFileResponse } = data ?? {}

    useEffect(() => {

        if (data) {
            dispatch({type: "SENT_QUERY_SUCCESS", payload: subscribeToFileResponse})
        }

    }, [data])

}