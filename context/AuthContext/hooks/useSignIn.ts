import { AuthContext } from "../AuthContext"

import { useContext, useEffect } from 'react'
import { useGoogleLogin } from 'react-google-login'
import { useQuery, useMutation, gql, useLazyQuery } from '@apollo/client'

const AUTH_GOOGLE = gql`
mutation authGoogle($input: AuthArgs!){
    authGoogle(input: $input) {
      success
    }
  }
`

export const useSignIn = () => {
    const { dispatch } = useContext(AuthContext)

    const [googleLogin, { loading, error, data }] = useMutation(AUTH_GOOGLE)

    console.log(loading, data, error);

    useEffect(() => {

        if (!loading) {
            
            if (error) {
                dispatch({ type: "LOGIN_ERROR", payload: error })
                return
            } 
            if(data) {
                dispatch({ type: "LOGIN_SUCCESS" })
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
        clientId: '629755736096-4nfiv64cnmk3jiuf85uvbj6fbhc79r2h.apps.googleusercontent.com',
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