import { useEffect, useContext } from "react";
import { PeopleAroundContext } from "../PeopleAroundContext";
import * as R from 'rambda'
import { useNearestUsers } from "./useNearestUsers";
import { useUpdateNearestDataSubscription } from "../../../generated/graphql";

export const useLivePeopleAround = () => {
    const { dispatch } = useContext(PeopleAroundContext)

    const { peopleAround } = useNearestUsers();

    const { loading, error, data } = useUpdateNearestDataSubscription();

    const { updateNearestData } = data ?? {}

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