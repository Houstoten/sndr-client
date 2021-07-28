import { useApolloClient } from "@apollo/client"
import { useContext, useEffect } from "react"
import { useSignOutMutation } from "../../../generated/graphql"
import { AuthContext } from "../AuthContext"
import { useAuthState } from "./useAuthState"

export const useSignOut = () => {
    const { dispatch } = useContext(AuthContext)

    const client = useApolloClient();

    const { logoutRequested, signedIn } = useAuthState()

    const [signOut, { loading, error, data }] = useSignOutMutation()

    useEffect(() => {
        if (logoutRequested && data?.signOut?.success) {
            client.clearStore();

            dispatch({ type: 'LOGOUT' })
            window.location.replace('/hello')
        }
    }, [loading, error, data])

    useEffect(() => {
        if (logoutRequested && signedIn) {
            signOut()
        }
    }, [logoutRequested])

    const requestSignOutHandler = () => dispatch({ type: 'REQUEST_LOGOUT' })


    return { signOut: requestSignOutHandler }
}