import { AuthContext } from "../AuthContext"

import { useContext, useEffect } from 'react'
import { useGoogleLogin } from 'react-google-login'
import { useApolloClient } from '@apollo/client'
import { useAuthGoogleMutation } from "../../../generated/graphql"

export const useSignIn = () => {
    const { dispatch } = useContext(AuthContext)
    const client = useApolloClient();
    
    const [googleLogin, { loading, error, data }] = useAuthGoogleMutation({
        onCompleted: data => {
            if (data) {
                dispatch({ type: "LOGIN_SUCCESS" })
                window.location.replace('/')
            }
        }
    })

    useEffect(() => {

        if (!loading) {

            if (error) {
                dispatch({ type: "LOGIN_ERROR", payload: error })
                return
            }
            if (data) {
                client.clearStore();

                dispatch({ type: "LOGIN_SUCCESS" })
                window.location.replace('/')

            }
        }
    }, [data, error, loading])

    const onSuccessHandler = ({ code }: any) => {
        const variables = { input: { code } };

        dispatch({ type: 'REQUEST_LOGIN' })

        googleLogin({ variables })
    }

    const onFailureHandler = () => {
        dispatch({ type: 'LOGIN_ABORT' })
    }

    const { signIn, loaded } = useGoogleLogin({
        clientId: '468081019600-vi6jg7dm5j9g7ngfeou0347qlpi0r693.apps.googleusercontent.com',
        onSuccess: onSuccessHandler,
        onFailure: onFailureHandler,
        accessType: 'offline',
        responseType: 'code',
        cookiePolicy: 'single_host_origin'
    })

    return ({
        signIn,
    })
}
