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

    const [refreshTokens, { loading, error, data }] = useMutation(REFRESH_TOKENS)

    const { signOut } = useSignOut()

    useEffect(() => {
        if (!loading) {
            if (data) {
                dispatch({ type: 'SET_REFRESH_TOKENS', payload: { refreshedTokens: true } })
            }
            if (error) {                
                signOut()
            }
        }
    }, [loading, error, data])

    return { refreshTokens }
}