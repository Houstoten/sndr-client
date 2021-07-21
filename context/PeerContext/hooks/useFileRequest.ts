import { gql, useMutation } from "@apollo/client"
import { useContext, useEffect } from "react"
import { PeerContext } from "../PeerContext"

const REQUEST_FILE_ACCEPT = gql`
mutation requestFileAccept($input: FileRequestArgs!){
    requestFileAccept(input: $input) {
      id,
      senderid,
      receiverid,
      name,
      size,
      accepted
    }
  }
`

export const useFileRequest = () => {
    const { dispatch } = useContext(PeerContext)

    const [requestFileAccept, { loading, error, data }] = useMutation(REQUEST_FILE_ACCEPT)

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