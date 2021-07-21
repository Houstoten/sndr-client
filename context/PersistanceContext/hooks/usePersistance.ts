import Dexie from "dexie"
import { useContext } from "react"
import { PersistanceContext } from "../PersistanceContext"

export const usePersistance = (): Dexie => {
    const { db } = useContext(PersistanceContext)

    return db
}