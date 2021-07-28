import * as R from 'rambda'

export interface FileRequest {
    id: string,
    senderid: string,
    sender?: any,
    receiver?: any,
    receiverid: string,
    name: string,
    size: number,
    accepted: boolean,
    updatedat?: Date
}
export interface PeerState {
    asSender: FileRequest[],
    asReceiver: (FileRequest & { pending: boolean, localAccepted: boolean })[]
}
export const initialState: PeerState = {
    asSender: [],
    asReceiver: []
};

export const PeerReducer = (state: PeerState, action: any) => {
    console.log('pinned dispatched', action);

    switch (action.type) {
        case "SENT_QUERY": // sender
            return {
                ...state,
                asSender: [...state.asSender, action.payload]
            }
        case "RECEIVED_QUERY": //receiver
            return {
                ...state,
                asReceiver: [...state.asReceiver, action.payload]
            }
        case "APPROVE_QUERY": //receiver
            return {
                ...state,
                asReceiver: R.map(
                    R.when(
                        R.propEq('id', action.payload.id),
                        R.assoc('accepted', action.payload.accepted)
                    ),
                    state.asReceiver)
            }
        case "LOCAL_APPROVE_QUERY": //receiver
            return {
                ...state,
                asReceiver: R.map(
                    R.when(
                        R.propEq('id', action.payload.id),
                        R.assoc('localAccepted', action.payload.localAccepted)
                    ),
                    state.asReceiver)
            }
        case "SENT_QUERY_SUCCESS": //sender            
            return {
                ...state,
                asSender: R.map(
                    R.when(
                        R.propEq('id', action.payload.id),
                        R.assoc('accepted', action.payload.accepted)
                    ),
                    state.asSender)
            }
        case "SET_PENDING_REQUEST":
            return {
                ...state,
                asReceiver: R.map(
                    R.when(
                        R.propEq('id', action.payload.id),
                        R.assoc('pending', action.payload.pending)
                    ),
                    state.asReceiver)
            }
        case "REMOVE_SENDER_REQUEST":
            return {
                ...state,
                asSender: R.reject(R.propEq('id', action.payload.id), state.asSender)
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};