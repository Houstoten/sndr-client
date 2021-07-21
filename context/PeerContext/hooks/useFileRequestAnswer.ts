import { gql, useMutation } from "@apollo/client"
import { useContext, useEffect } from "react"
import { PeerContext } from "../PeerContext"

const REQUEST_FILE_ACCEPT_ANSWER = gql`
mutation responseFileAccept($input: FileResponseArgs!){
    responseFileAccept(input: $input) {
      id,
      senderid,
      receiverid,
      name,
      size,
      accepted
    }
  }
`

export const useFileRequestAnswer = () => {
    const { dispatch } = useContext(PeerContext)

    const [requestFileAcceptAnswer, { loading, error, data }] = useMutation(REQUEST_FILE_ACCEPT_ANSWER)

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