import { useContext } from "react"

import { PeerContext } from "../PeerContext"
import { PeerState } from "../reducer/reducer"

export const useCurrentConnections = () : PeerState => {
    const { store } = useContext(PeerContext)

    return store
}