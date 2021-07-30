import { useEffect, useContext } from "react";
import { PeopleAroundContext } from "../PeopleAroundContext";
import * as R from 'rambda'
import { useNearestUsers } from "./useNearestUsers";
import { TrackedUsersArgs, useUpdateNearestDataSubscription } from "../../../generated/graphql";

export const useLivePeopleAround: (TrackedUsers: TrackedUsersArgs) => void = (trackedUsers: TrackedUsersArgs) => {
    const { dispatch } = useContext(PeopleAroundContext)

    const { peopleAround } = useNearestUsers();

    const { loading, error, data } = useUpdateNearestDataSubscription({ variables: { input: trackedUsers } });

    const { updateNearestData } = data ?? {}

    useEffect(() => {

        if (!loading && !error) {
            dispatch({ type: 'UPDATE_BY_ID', payload: updateNearestData })
        }
    }, [data])
}