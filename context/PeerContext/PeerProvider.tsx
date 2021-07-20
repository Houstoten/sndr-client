import React, { useEffect, useReducer, useState } from 'react'

import { DataConnection } from 'peerjs'
import { PeerContext } from './PeerContext'
import { useAuthState } from '../AuthContext/hooks/useAuthState';
import { isServer } from '../../utils/isServer';
import { saveAs } from 'file-saver';
import { initialState, PeerReducer } from './reducer/reducer';
import * as R from 'rambda'

//@ts-ignore
export const PeerProvider = ({ options, children }) => {

    const [store, dispatch] = useReducer(PeerReducer, initialState);

    const { connectionsWithMetadata } = store

    const { userDetails } = useAuthState()

    const { id } = userDetails ?? {}
    const [peer, initPeer] = useState<any>(null)

    const Peer = !isServer && require("peerjs").default

    useEffect(() => {
        if (id) {
            const _peer = new Peer(id, options)

            _peer.on('connection', (connection: DataConnection) => {

                dispatch({ type: "NEW_CONNECTION", payload: { connection } })
                                // connection.on('open', () => {
                //     connection.on('data', (data: any) => {
                //         saveAs(new Blob([data]), "web.xml")
                //     });
                // })

            });

            !isServer && Peer && initPeer(_peer)
        }
    }, [id])

    useEffect(() => {
        connectionsWithMetadata.forEach((connection: DataConnection & { accepted: boolean }) => {

            const { accepted, metadata } = connection
            const { name, id } = metadata

            if (!R.isNil(accepted)) {
                if (accepted === true) {
                    
                    console.log(connection);

                    connection.on('open', () => {
                        connection.on('data', (data: any) => {
                            saveAs(new Blob([data]), name)
                        });
                    })
                } else {
                    dispatch({ type: "REMOVE_CONNECTION", payload: { id } })
                }
            }
        })
    }, [connectionsWithMetadata])

    return (
        <PeerContext.Provider value={{ peer, store, dispatch }}>
            {children}
        </PeerContext.Provider>
    );
};
