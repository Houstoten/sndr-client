import { useEffect, useContext } from "react"
import { useRefreshTokensMutation } from "../../../generated/graphql"
import { AuthContext } from "../AuthContext"
import { useSignOut } from "./useSignOut"

export const useTokenRefresh = () => {
    const { dispatch } = useContext(AuthContext)

    const [refreshTokens, { loading, error, data }] = useRefreshTokensMutation()

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