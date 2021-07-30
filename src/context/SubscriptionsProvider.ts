import { useSubscribeToFileRequest } from "./PeerContext/hooks/useSubcribeToFileRequest"
import { useSubscribeToFileResponse } from "./PeerContext/hooks/useSubscribeToFileResponse"
import { useLivePeopleAround } from "./PeopleAroundContext/hooks/useLivePeopleAround"
import { useNearestUsers } from "./PeopleAroundContext/hooks/useNearestUsers"
import { useNewConnect } from "./PeopleAroundContext/hooks/useNewConnect"
import * as R from 'rambda'

export const SubscriptionsProvider = ({ children }: any) => {

    const { peopleAround } = useNearestUsers()

    //People around subscriptions
    useLivePeopleAround({ ids: peopleAround.map(R.prop('id')) })
    useNewConnect()

    //File Requests subscriptions
    useSubscribeToFileRequest()
    useSubscribeToFileResponse()

    return children

}