import React, { useEffect, useMemo, useReducer, useState } from 'react'

import Peer, { DataConnection } from 'peerjs'
import { PeerContext } from './PeerContext'
import { useAuthState } from '../AuthContext/hooks/useAuthState';
import { isServer } from '../../utils/isServer';
import { saveAs } from 'file-saver';
import { FileRequest, initialState, PeerReducer } from './reducer/reducer';
import * as R from 'rambda'

export const PeerProvider = ({ options, children }: any) => {

    //@ts-ignore
    const [store, dispatch] = useReducer(PeerReducer, initialState);

    const { asReceiver }: { asReceiver: (FileRequest & { pending: boolean, localAccepted: boolean })[] } = store

    const { userDetails } = useAuthState()

    const { id } = userDetails ?? {}

    const Peer = !isServer && require("peerjs").default

    const [peer, initPeer] = useState<Peer | null>(null)

    useEffect(() => {
        id && !isServer && Peer && initPeer(new Peer(id, options))
    }, [id])

    const setupConnectionHandler = (_asReceiver: any, peer: Peer | null) => {
        peer && peer.on('connection', (connection: DataConnection) => {

            const { metadata } = connection

            const { id } = metadata

            connection.on('open', () => {

                connection.on('data', (data: any) => {

                    const receiveFilePrompt = R.find(
                        R.propEq('id', id),
                        asReceiver
                    )

                    const { name, accepted, localAccepted } = receiveFilePrompt ?? {}

                    if (accepted || localAccepted) {
                        saveAs(new Blob([data]), name)
                        connection.close()
                    }
                });
            })

        });
    }

    return (
        <PeerContext.Provider value={{ peer, setupConnectionHandler, store, dispatch }}>
            {children}
        </PeerContext.Provider>
    );
};
