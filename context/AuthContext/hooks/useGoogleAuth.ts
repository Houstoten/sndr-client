import { AuthContext } from "../AuthContext"

import React, { useContext } from 'react'
import { useGoogleLogin } from 'react-google-login'
import { request, gql } from 'graphql-request'

export const useGoogleAuth = () => {
    const { store, dispatch } = useContext(AuthContext)

    const {userDetails, userId, loading, signedIn} = store;
        
    const requestLogin = () => {
        dispatch({ type: 'REQUEST_LOGIN' })
    }

    const loadUserData = async () => {
        const query = gql`
        query{
            getUserData{
              name,
              email,
              image
            }
          }
        `
        dispatch({type: "LOAD_USER_DATA"})

        const { getUserData: loadedUserData } = await request('/api', query)        
        
        dispatch({type: "LOAD_USER_DATA_SUCCESS", payload: loadedUserData})
    }

    const refreshTokens = async () => {
        const query = gql`
        mutation {
            refreshTokens {
              success
            }
          }
        `

        const { 
            refreshTokens: { 
                success 
            } 
        } = await request('/api', query)

        console.log("!TOKENS REFRESHED SUCCESSFULLY!");
        
    }

    const onSuccessHandler = async ({ code }: any) => {

        const query = gql`
        mutation authGoogle($input: AuthArgs!){
            authGoogle(input: $input) {
              success
            }
          }
        `

        const variables = { input: { code } };
        
        const { 
            authGoogle: { 
                success 
            } 
        } = await request('/api', query, variables)
        
        success && dispatch({
            type: "LOGIN_SUCCESS",
        })

        success && await loadUserData()
    }

    const onFailureHandler = (data: any) => {
        return null
    }

    const { signIn, loaded } = useGoogleLogin({
        clientId: '629755736096-4nfiv64cnmk3jiuf85uvbj6fbhc79r2h.apps.googleusercontent.com',
        onSuccess: onSuccessHandler,
        onFailure: onFailureHandler,
        accessType: 'offline',
        responseType: 'code'
    })

    const signOut = () => {
        dispatch({ type: 'LOGOUT' })
    }

    const signInHandler = () => {
        requestLogin()
        signIn()
    }

    return ({
        signIn: signInHandler,
        signOut,
        requestLogin,
        loadUserData,
        userDetails,
        userId,
        loading,
        signedIn,
        refreshTokens
    })
}
