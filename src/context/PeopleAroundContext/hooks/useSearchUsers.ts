import { useContext, useEffect } from "react"
import { useFindUserByNameOrEmailLazyQuery } from "../../../generated/graphql"
import { PeopleAroundContext } from "../PeopleAroundContext"

export const useFindUsers = () => {

    const { store, dispatch } = useContext(PeopleAroundContext)

    const { foundUsers } = store

    const [findUsers, { loading, data, error }] = useFindUserByNameOrEmailLazyQuery()

    useEffect(() => {

        if (!loading && data) {
            const { findUserByNameOrEmail } = data

            dispatch({ type: "SET_FOUND_NEW_USERS", payload: findUserByNameOrEmail })
        }

    }, [data, error, loading])

    const resetFound = () => dispatch({ type: "SET_FOUND_NEW_USERS", payload: null })

    return { foundUsers, findUsers, resetFound, loading }
}
