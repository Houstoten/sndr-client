import { useContext } from "react"
import { AuthContext } from "../AuthContext"

export const useAuthState = () => {
    const { store } = useContext(AuthContext)

    return store
}