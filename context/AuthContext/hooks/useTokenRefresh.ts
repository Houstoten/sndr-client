import { gql, useMutation } from "@apollo/client"
import { useEffect, useContext } from "react"
import { AuthContext } from "../AuthContext"
import { useSignOut } from "./useSignOut"

const REFRESH_TOKENS = gql`
mutation {
    refreshTokens {
      success
    }
  }
`

export const useTokenRefresh = () => {
    const { dispatch } = useContext(AuthContext)

    const [refreshTokens, { loading, error }] = useMutation(REFRESH_TOKENS)

    const { signOut } = useSignOut()

    useEffect(() => {
        dispatch({ type: 'UPDATE_LOADING', payload: { loading } })
    }, [loading])

    useEffect(() => {
        if (!loading) {
            if (error) {
                signOut()
            }
        }
    }, [loading, error])

    return { refreshTokens }
}