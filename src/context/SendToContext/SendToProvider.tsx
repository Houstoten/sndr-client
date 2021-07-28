import React, { useReducer } from 'react'

import { SendToContext } from './/SendtToContext'
import { SendToReducer, initialState } from './reducer/reducer';

export const SendToProvider = ({ children }: { children: any }) => {
    const [store, dispatch] = useReducer(SendToReducer, { ...initialState });

    return (
        <SendToContext.Provider value={{ store, dispatch }}>
            {children}
        </SendToContext.Provider>
    );
};
