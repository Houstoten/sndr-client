import React, { useEffect, useMemo } from "react";

import { PersistanceContext } from "./PersistanceContext";

import Dexie from 'dexie'
import { isServer } from "../../utils/isServer";

export const PersistanceProvider = ({ children }: any) => {

    const db = useMemo(() => !isServer && new Dexie("Share-db"), [isServer]);

    useEffect(() => {
        db && db.version(1).stores({
            files: 'id'
        });
    }, [db])

    return <PersistanceContext.Provider value={{ db }}>
        {children}
    </PersistanceContext.Provider>

}