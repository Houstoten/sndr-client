import { useContext, useEffect } from "react"
import { useGetRecentUsersRelationsLazyQuery } from "../../../generated/graphql"
import { PeopleAroundContext } from "../PeopleAroundContext"

export const useRecentContacts = () => {

    const { store: { recentContacts }, dispatch } = useContext(PeopleAroundContext)

    const [loadRecentContacts, { loading, data, error }] = useGetRecentUsersRelationsLazyQuery()

    useEffect(() => {

        if (!loading && data) {
            const { getRecentUsersRelations } = data

            dispatch({ type: "SET_RECENT_CONTACTS", payload: getRecentUsersRelations })
        }
    }, [data, error, loading])


    return { recentContacts, loadRecentContacts }
}