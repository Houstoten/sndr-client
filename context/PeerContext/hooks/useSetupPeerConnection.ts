import Peer from "peerjs"
import { useContext } from "react"

import { PeerContext } from "../PeerContext"

export const useSetupPeerConnection = (): Peer => {
    const { setupConnectionHandler } = useContext(PeerContext)

    return setupConnectionHandler
}