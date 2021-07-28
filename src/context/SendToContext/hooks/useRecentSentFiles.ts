import { gql, useLazyQuery } from "@apollo/client"
import { useContext, useEffect } from "react"
import { useGetRecentFileRequestsLazyQuery } from "../../../generated/graphql"
import { SendToContext } from "../SendtToContext"

const GET_RECENT_FILES = gql`
query getRecentFileRequests($input: UserByIdArgs!){
    getRecentFileRequests(input: $input){
        id,
        senderid,
        receiverid,
        name,
        size,
        accepted,
        updatedat
    }
  }
`

export const useRecentSentFiles = () => {
    const { store: { recentFiles }, dispatch } = useContext(SendToContext)

    const [loadRecentFiles, { loading, data, error }] = useGetRecentFileRequestsLazyQuery()

    useEffect(() => {

        if (!loading && data) {
            const { getRecentFileRequests } = data

            dispatch({ type: "SET_RECENT_FILES", payload: getRecentFileRequests })
        }
    }, [data, error, loading])


    return { recentFiles, loadRecentFiles }
}