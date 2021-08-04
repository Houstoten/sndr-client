import { FileRequest, User } from "../../types";

export interface SendToReducerState {
    sendToUser: User | null,
    recentFiles: FileRequest[]
}

export const initialState: SendToReducerState = {
    sendToUser: null,
    recentFiles: []
}

export const SendToReducer = (state: SendToReducerState, action: any) => {
    console.log('pinned dispatched', action);

    switch (action.type) {
        case "SET_SEND_TO_USER":
            return {
                ...state,
                sendToUser: action.payload
            }
        case "SET_RECENT_FILES":
            return {
                ...state,
                recentFiles: action.payload
            }
        case "RESET":
            return initialState

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }

}
