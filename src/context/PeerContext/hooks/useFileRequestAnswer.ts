import { useContext, useEffect } from "react"
import { useResponseFileAcceptMutation } from "../../../generated/graphql"
import { PeerContext } from "../PeerContext"

export const useFileRequestAnswer = () => {
    const { dispatch } = useContext(PeerContext)

    const [requestFileAcceptAnswer, { loading, error, data }] = useResponseFileAcceptMutation()

    useEffect(() => {
        if (data) {
            const { responseFileAccept } = data

            const { id, accepted } = responseFileAccept

            dispatch({ type: 'APPROVE_QUERY', payload: {id, accepted} })
            dispatch({ type: "SET_PENDING_REQUEST", payload: { id, pending: false } })

            return;
        }

        if (error) {
            console.log(error);
        }

    }, [data, error, loading])

    return { requestFileAcceptAnswer }
}