import { useContext, useEffect } from "react"
import { useGetUserByIdLazyQuery } from "../../../generated/graphql"
import { SendToContext } from "../SendtToContext"

export const useUserSendTo = () => {
    const { store: { sendToUser }, dispatch } = useContext(SendToContext)

    const [loadUserById, { loading, data, error }] = useGetUserByIdLazyQuery({ fetchPolicy: 'network-only' })

    useEffect(() => {

        if (!loading && data) {
            const { getUserById } = data

            dispatch({ type: "SET_SEND_TO_USER", payload: getUserById })
        }
    }, [data, error, loading])


    return { sendToUser, loadUserById }
}