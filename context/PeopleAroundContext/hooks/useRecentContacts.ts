import { gql, useLazyQuery } from "@apollo/client"
import { useContext, useEffect } from "react"
import { PeopleAroundContext } from "../PeopleAroundContext"

const GET_RECENT_CONTACTS = gql`
query{
    getRecentUsersRelations{
      id,
      name,
      email,
      image,
      online
    }
  }
`

export const useRecentContacts = () => {

    const { store: { recentContacts }, dispatch } = useContext(PeopleAroundContext)

    const [loadRecentContacts, { loading, data, error }] = useLazyQuery(GET_RECENT_CONTACTS)

    useEffect(() => {

        if (!loading && data) {
            const { getRecentUsersRelations } = data

            dispatch({ type: "SET_RECENT_CONTACTS", payload: getRecentUsersRelations })
        }
    }, [data, error, loading])


    return { recentContacts, loadRecentContacts }
}