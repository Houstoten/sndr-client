import { gql, useApolloClient, useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { AuthContext } from "../AuthContext"
import { useAuthState } from "./useAuthState"

const SIGN_OUT = gql`
mutation {
    signOut {
      success
    }
  }
`

export const useSignOut = () => {
    const { dispatch } = useContext(AuthContext)

    const client = useApolloClient();

    const { logoutRequested, signedIn } = useAuthState()

    const [signOut, { loading, error, data }] = useMutation(SIGN_OUT)

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