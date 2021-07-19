import { gql, useMutation } from "@apollo/client"
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

    const { logoutRequested } = useAuthState()

    const [signOut, { loading, error, data }] = useMutation(SIGN_OUT)


    useEffect(() => {
        if (logoutRequested) {
            dispatch({ type: 'LOGOUT' })
        }
    }, [loading, error, data])

    useEffect(() => {
        logoutRequested && signOut()
    }, [logoutRequested])

    const requestSignOutHandler = () => dispatch({ type: 'REQUEST_LOGOUT' })


    return { signOut: requestSignOutHandler }
}