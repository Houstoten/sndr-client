import { AuthContext } from "../AuthContext"

import React, { useContext } from 'react'
import { useGoogleLogin } from 'react-google-login'
import { request, gql } from 'graphql-request'

export const useGoogleAuth = () => {
    const { store, dispatch } = useContext(AuthContext)

    const { userDetails, userId, loading, signedIn, errorMessage } = store;

    const requestLogin = () => {
        dispatch({ type: 'REQUEST_LOGIN' })
    }

    const signOut = async () => {
        const query = gql`
        mutation {
            signOut {
              success
            }
          }
        `
        try {

            const {
                signOut: {
                    success
                }
            } = await request('/api', query)

            dispatch({ type: 'LOGOUT' })
        } catch (error) {
            console.log(error);
            
        }
    }

    const refreshTokens = async () => {
        const query = gql`
        mutation {
            refreshTokens {
              success
            }
          }
        `
        try {

            const {
                refreshTokens: {
                    success
                }
            } = await request('/api', query)

            console.log("!TOKENS REFRESHED SUCCESSFULLY!");
        } catch (error) {
            signOut()
        }
    }

    const refreshedTokensFirst = async (func: Function) => {
        await refreshTokens()

        await func()
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
        dispatch({ type: "LOAD_USER_DATA" })

        try {
            const { getUserData: loadedUserData } = await request('/api', query)

            dispatch({ type: "LOAD_USER_DATA_SUCCESS", payload: loadedUserData })
        } catch (error) {            
            dispatch({ type: "LOAD_USER_DATA_ERROR", payload: error })
        }
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

    const onFailureHandler = () => {
        dispatch({type: 'LOGIN_ABORT'})
    }

    const { signIn, loaded } = useGoogleLogin({
        clientId: '629755736096-4nfiv64cnmk3jiuf85uvbj6fbhc79r2h.apps.googleusercontent.com',
        onSuccess: onSuccessHandler,
        onFailure: onFailureHandler,
        accessType: 'offline',
        responseType: 'code'
    })

    const signInHandler = () => {
        requestLogin()
        signIn()
    }

    return ({
        signIn: signInHandler,
        signOut,
        requestLogin,
        loadUserData,
        refreshedTokensFirst,
        userDetails,
        userId,
        loading,
        signedIn,
        errorMessage
    })
}
