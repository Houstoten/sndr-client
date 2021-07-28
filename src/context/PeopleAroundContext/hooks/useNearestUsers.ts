import { useContext, useEffect } from "react"
import { useGetNearestUsersLazyQuery } from "../../../generated/graphql"
import { PeopleAroundContext } from "../PeopleAroundContext"

export const useNearestUsers = () => {

    const { store, dispatch } = useContext(PeopleAroundContext)

    const { peopleAround } = store

    const [getNearestUsers, { loading, data, error }] = useGetNearestUsersLazyQuery()

    useEffect(() => {

        if (!loading && data) {
            const { getNearestUsers } = data

            dispatch({ type: "LOAD_PEOPLE_SUCCESS", payload: getNearestUsers })
        }

    }, [data, error, loading])

    const getNearestUsersHandler = () => {
        dispatch({ type: "LOAD_PEOPLE" })
        getNearestUsers()
    }

    return { peopleAround, getNearestUsers: getNearestUsersHandler }
}