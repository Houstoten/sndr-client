import { gql, useSubscription } from "@apollo/client"
import { useEffect, useContext } from "react";
import { PeopleAroundContext } from "../PeopleAroundContext";
import * as R from 'rambda'
import { usePeopleAround } from "./usePeopleAround";

const NEAREST_SUBSCRIPTION = gql`
subscription{
    updateNearestData{
        id,
        name,
        image, 
        email,
        distance
    }
  }
`

export const useLivePeopleAround = () => {
    const { dispatch } = useContext(PeopleAroundContext)

    const { peopleAround } = usePeopleAround();

    const { loading, error, data } = useSubscription(NEAREST_SUBSCRIPTION);

    const {updateNearestData} = data ?? {}

    useEffect(() => {

        if (!loading && !error) {
            if (!R.find(R.propEq('id', updateNearestData.id), peopleAround)) {
                dispatch({ type: 'CREATE_BY_ID', payload: updateNearestData })
                return 
            }

            dispatch({ type: 'UPDATE_BY_ID', payload: updateNearestData })
        }
    }, [data])
}