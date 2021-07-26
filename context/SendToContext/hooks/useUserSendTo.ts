import { gql, useLazyQuery } from "@apollo/client"
import { useContext, useEffect } from "react"
import { SendToContext } from "../SendtToContext"

const GET_USER_BY_ID = gql`
query getUserById($input: UserByIdArgs!){
    getUserById(input: $input){
      id,
      name,
      email,
      image,
    }
  }
`

export const useUserSendTo = () => {
    const { store: { sendToUser }, dispatch } = useContext(SendToContext)

    const [loadUserById, { loading, data, error }] = useLazyQuery(GET_USER_BY_ID, {
        fetchPolicy: 'network-only'
    })

    useEffect(() => {

        if (!loading && data) {
            const { getUserById } = data

            dispatch({ type: "SET_SEND_TO_USER", payload: getUserById })
        }
    }, [data, error, loading])


    return { sendToUser, loadUserById }
}