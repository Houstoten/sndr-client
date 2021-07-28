import { PeerContext } from "../PeerContext";
import { useContext, useEffect } from 'react'
import { useSubscribeToFileRequestSubscription } from "../../../generated/graphql";

export const useSubscribeToFileRequest = () => {
    const { dispatch } = useContext(PeerContext)

    const { error, data } = useSubscribeToFileRequestSubscription()

    const { subscribeToFileRequest } = data ?? {}
    
    useEffect(() => {

        if (data) {
            dispatch({type: "RECEIVED_QUERY", payload: subscribeToFileRequest})
        }

    }, [data])

}