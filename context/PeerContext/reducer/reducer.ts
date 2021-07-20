import { DataConnection } from 'peerjs'
import * as R from 'rambda'

export interface PeerState {
    connectionsWithMetadata: (DataConnection & { accepted: boolean })[]
}
export const initialState: PeerState = {
    connectionsWithMetadata: [],
};

export const PeerReducer = (state: any, action: any) => {
    console.log('pinned dispatched', action);

    switch (action.type) {
        case "NEW_CONNECTION":
            return {
                ...state,
                connectionsWithMetadata: [...state.connectionsWithMetadata, action.payload.connection]
            };
        case "REMOVE_CONNECTION":
            return {
                ...state,
                connectionsWithMetadata: R.reject(R.pathEq(['metadata', 'id'], action.payload.id), state.connectionsWithMetadata)
            };
        case "SET_REACTION":            
            return {
                ...state,
                connectionsWithMetadata: R.map(
                    R.when(
                        R.pathEq(['metadata', 'id'], action.payload.id),
                        R.assoc('accepted', action.payload.accepted)
                    ),
                    state.connectionsWithMetadata)
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};