import { useEffect, useContext } from "react";
import { PeopleAroundContext } from "../PeopleAroundContext";
import * as R from 'rambda'
import { useNearestUsers } from "./useNearestUsers";
import { useUpdateUserOnlineSubscription } from "../../../generated/graphql";

export const useNewConnect = () => {
    const { dispatch } = useContext(PeopleAroundContext)

    const { peopleAround } = useNearestUsers();

    const { loading, error, data } = useUpdateUserOnlineSubscription();

    const { updateUserOnline } = data ?? {}
    
    useEffect(() => {

        if (!loading && !error) {
            
            if (!!R.find(R.propEq('id', updateUserOnline.id), peopleAround) && !updateUserOnline.online) {
                dispatch({ type: 'REMOVE_BY_ID', payload: updateUserOnline })
                return
            }

            if (!R.find(R.propEq('id', updateUserOnline.id), peopleAround) && updateUserOnline.online) {
                dispatch({ type: 'CREATE_BY_ID', payload: updateUserOnline })
            }
        }

    }, [updateUserOnline])
}