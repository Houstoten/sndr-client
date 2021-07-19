import React, {useReducer} from 'react'

import {PeopleAroundContext} from './PeopleAroundContext'
import { PeopleAroundReducer, initialState } from './reducer/reducer';

export const PeopleAroundProvider = ({ children }: {children: any}) => {
    const [store, dispatch] = useReducer(PeopleAroundReducer, {...initialState});

    return (
      <PeopleAroundContext.Provider value={{store, dispatch}}>
          {children}
      </PeopleAroundContext.Provider>
    );
  };
