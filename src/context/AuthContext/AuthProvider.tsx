import React, {useReducer} from 'react'

import {AuthContext} from './AuthContext'
import { AuthReducer, initialState } from './reducer/reducer';

//@ts-ignore
export const GoogleAuthProvider = ({ children }) => {
    const [store, dispatch] = useReducer(AuthReducer, {...initialState});

    return (
      <AuthContext.Provider value={{store, dispatch}}>
          {children}
      </AuthContext.Provider>
    );
  };
