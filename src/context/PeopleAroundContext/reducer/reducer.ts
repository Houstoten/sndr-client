import * as R from 'rambda'
export const initialState = {
    peopleAround: [],
    currentPositionUpdatedAt: null,
    recentContacts: [],
    errorMessage: null,
    loading: false
};

export const PeopleAroundReducer = (state: any, action: any) => {
    console.log('pinned dispatched', action);

    switch (action.type) {
        case "SET_RECENT_CONTACTS": 
            return {
                ...state,
                recentContacts: action.payload
            }
        case "UPDATE_CURRENT_POSITION":
            return {
                ...state,
                ...action.payload
            };
        case "LOAD_PEOPLE":
            return {
                ...state,
                loading: true
            };
        case "LOAD_PEOPLE_SUCCESS":
            return {
                ...state,
                peopleAround: action.payload,
                loading: false
            };

        case "UPDATE_BY_ID":
            return {
                ...state,
                peopleAround: R.map(
                    R.when(
                        R.propEq('id', action.payload.id),
                        R.assoc('distance', action.payload.distance)
                    ),
                    state.peopleAround),
                loading: false
            };

        case "CREATE_BY_ID":
            return {
                ...state,
                peopleAround: [...state.peopleAround, action.payload],
                loading: false
            };

        case "REMOVE_BY_ID":
            return {
                ...state,
                peopleAround: R.reject(R.propEq('id', action.payload.id), state.peopleAround),
                loading: false
            };

        case "LOAD_PEOPLE_ERROR":
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            };

        case "LOAD_PEOPLE_ABORT":
            return {
                ...state,
                loading: false,
            };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
