import React, { useEffect, useReducer, useRef, useState } from 'react'

import Peer, { DataConnection } from 'peerjs'
import { PeerContext } from './PeerContext'
import { useAuthState } from '../AuthContext/hooks/useAuthState';
import { isServer } from '../../utils/isServer';
import { saveAs } from 'file-saver';
import { initialState, PeerReducer } from './reducer/reducer';
import { FileRequest } from '../types';
import * as R from 'rambda'

export const PeerProvider = ({ options, children }: any) => {

    //@ts-ignore
    const [store, dispatch] = useReducer(PeerReducer, initialState);

    //@ts-ignore
    const { asReceiver }: { asReceiver: (FileRequest & { pending: boolean, localAccepted: boolean })[] } = store

    const { userDetails } = useAuthState()

    const { id } = userDetails ?? {}

    const Peer = !isServer && require("peerjs").default

    const [peer, initPeer] = useState<Peer | null>(null)

    const asReceiverRef = useRef(null)

    useEffect(() => {
        asReceiverRef.current = asReceiver
    }, [asReceiver])

    const setupConnectionHandler = (peer: Peer | null) => {
        peer && peer.on('connection', (connection: DataConnection) => {

            const { metadata } = connection

            const { id } = metadata

            connection.on('open', () => {

                connection.on('data', (data: any) => {

                    const _asReceiver = asReceiverRef.current

                    const receiveFilePrompt = R.find(
                        R.propEq('id', id),
                        _asReceiver
                    )

                    const { name, accepted, localAccepted }: any = receiveFilePrompt ?? {}

                    if (accepted || localAccepted) {
                        saveAs(new Blob([data]), name)
                        connection.close()
                    }
                });
            })

        });
    }

    useEffect(() => {
        let _peer;
        _peer = id && !isServer && Peer && new Peer(id, options)
        if(_peer) {            
            setupConnectionHandler(_peer)

            initPeer(_peer)
        }
    }, [id, isServer, Peer])

    return (
        <PeerContext.Provider value={{ peer, store, dispatch }}>
            {children}
        </PeerContext.Provider>
    );
};
