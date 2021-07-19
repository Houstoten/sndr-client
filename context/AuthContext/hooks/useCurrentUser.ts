import { gql, useLazyQuery } from "@apollo/client"
import { useContext, useEffect } from "react"
import { AuthContext } from "../AuthContext"
import * as R from 'rambda'

const GET_USER_DATA = gql`
query{
    getUserData{
      name,
      email,
      image
    }
  }
`

export const useCurrentUser = () => {

    const { store, dispatch } = useContext(AuthContext)

    const [loadUserData, { loading, data, error }] = useLazyQuery(GET_USER_DATA)

    useEffect(() => {

        if (!loading) {
            if (error) {
                dispatch({ type: "LOAD_USER_DATA_ERROR", payload: error })
                return
            }
            if (data) {
                const { getUserData: loadedUserData } = data

                dispatch({ type: "LOAD_USER_DATA_SUCCESS", payload: loadedUserData })
            }
        }
    }, [data, error, loading])

    useEffect(() => {
        dispatch({ type: 'UPDATE_LOADING', payload: { loading } })
    }, [loading])

    return R.compose(
        R.set(R.lensProp('loadUserData'), loadUserData),
        R.pickAll(['userId', 'userDetails'])
    )(store)
}