import { useSubscribeToFileRequest } from "./PeerContext/hooks/useSubcribeToFileRequest"
import { useSubscribeToFileResponse } from "./PeerContext/hooks/useSubscribeToFileResponse"
import { useLivePeopleAround } from "./PeopleAroundContext/hooks/useLivePeopleAround"
import { useNewConnect } from "./PeopleAroundContext/hooks/useNewConnect"

export const SubscriptionsProvider = ({ children }: any) => {

    //People around subscriptions
    useLivePeopleAround()
    useNewConnect()

    //File Requests subscriptions
    useSubscribeToFileRequest()
    useSubscribeToFileResponse()

    return children

}