import { PeerContext } from "../PeerContext";
import { useContext, useEffect } from 'react'
import { useSubscribeToFileResponseSubscription } from "../../../generated/graphql";

export const useSubscribeToFileResponse = () => {
    const { dispatch } = useContext(PeerContext)

    const { error, data } = useSubscribeToFileResponseSubscription();

    const { subscribeToFileResponse } = data ?? {}

    useEffect(() => {

        if (data) {
            dispatch({type: "SENT_QUERY_SUCCESS", payload: subscribeToFileResponse})
        }

    }, [data])

}