import { useContext, useEffect } from "react"
import { useRequestFileAcceptMutation } from "../../../generated/graphql"
import { PeerContext } from "../PeerContext"

export const useFileRequest = () => {
    const { dispatch } = useContext(PeerContext)

    const [requestFileAccept, { loading, error, data }] = useRequestFileAcceptMutation()

    useEffect(() => {
        if (data) {
            const { requestFileAccept } = data
            dispatch({ type: 'SENT_QUERY', payload: requestFileAccept })
            return;
        }

        if (error) {
            console.log(error);
        }

    }, [data, error, loading])

    return { requestFileAccept }
}