import { gql, useSubscription } from "@apollo/client"
import { useEffect, useContext } from "react";
import { PeopleAroundContext } from "../PeopleAroundContext";
import * as R from 'rambda'
import { usePeopleAround } from "./usePeopleAround";

const USERONLINE_SUBSCRIPTION = gql`
subscription{
    updateUserOnline{
        id,
        name,
        email,
        image,
        distance,
        online
    }
  }
`

export const useNewConnect = () => {
    const { dispatch } = useContext(PeopleAroundContext)

    const { peopleAround } = usePeopleAround();

    const { loading, error, data } = useSubscription(USERONLINE_SUBSCRIPTION);

    const { updateUserOnline = {} } = data ?? {}
    
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