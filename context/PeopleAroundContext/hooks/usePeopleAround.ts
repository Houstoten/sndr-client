import request, { gql } from 'graphql-request';
import { useContext } from 'react'

import { PeopleAroundContext } from "../PeopleAroundContext";

export const usePeopleAround = () => {
    const { store, dispatch } = useContext(PeopleAroundContext)

    const { peopleAround, recentContacts, currentPositionUpdatedAt, errorMessage, loading } = store;
    
    const onSuccess = async (position: GeolocationPosition) => {
        const query = gql`
        mutation setCurrentPosition($input: PositionArgs!){
            setCurrentPosition(input: $input) {
              latitude, longitude, updatedat
            }
          }
        `

        const { latitude, longitude } = position.coords;
        const variables = { input: { latitude, longitude } };

        const {
            setCurrentPosition: {
                latitude: _latitude, longitude: _longitude, updatedat
            }
        } = await request('/api', query, variables)

        console.log("Location updated! ", _latitude, _longitude, updatedat);

        dispatch({type: 'UPDATE_CURRENT_POSITION', payload: {currentPositionUpdatedAt: updatedat}})
    }
    
    const sendCurrentPosition = () => navigator.geolocation.getCurrentPosition(onSuccess)
    
    const loadPeopleAround = async () => {
        
        dispatch({type: "LOAD_PEOPLE"})

        const _query = gql`
        query{
            getNearestUsers{
                name,
                image,
                email,
                id,
                distance
            }
          }
        `

        const { getNearestUsers: peopleAround } = await request('/api', _query)

        dispatch({type: 'LOAD_PEOPLE_SUCCESS', payload: {peopleAround}})
    }

    return {
        peopleAround,
        recentContacts,
        currentPositionUpdatedAt,
        errorMessage,
        loading,
        loadPeopleAround,
        sendCurrentPosition
    }
};