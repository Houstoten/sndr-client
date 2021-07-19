import { gql, useSubscription } from "@apollo/client"
import { useEffect, useContext } from "react";
import { PeopleAroundContext } from "../PeopleAroundContext";

const NEAREST_SUBSCRIPTION = gql`
subscription{
    updateNearestData{
        id,
        distance
    }
  }
`

export const useLivePeopleAround = () => {
    const { dispatch } = useContext(PeopleAroundContext)

    const { loading, error, data } = useSubscription(NEAREST_SUBSCRIPTION);

    useEffect(() => {

        if (!loading && !error) {
            dispatch({ type: 'UPDATE_BY_ID', payload: data.updateNearestData })
        }
    }, [data])
}