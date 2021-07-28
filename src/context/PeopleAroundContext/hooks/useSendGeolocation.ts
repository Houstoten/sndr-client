import { useContext, useEffect } from "react"
import { useSetCurrentPositionMutation } from "../../../generated/graphql"
import { PeopleAroundContext } from "../PeopleAroundContext"

export const useSendGeolocation = () => {

    const { store, dispatch } = useContext(PeopleAroundContext)

    const { currentPositionUpdatedAt } = store

    const [sendGeolocation, { loading, data, error }] = useSetCurrentPositionMutation()

    useEffect(() => {

        if (!loading && data) {
            const { setCurrentPosition: { updatedat } } = data

            dispatch({ type: "UPDATE_CURRENT_POSITION", payload: { currentPositionUpdatedAt: updatedat } })
        }

    }, [data, error, loading])

    const onRequestSuccess = (position: GeolocationPosition) => {

        const { latitude, longitude } = position.coords;
        const variables = { input: { latitude, longitude } };

        sendGeolocation({ variables })
    }

    const requestGeolocation = () => navigator.geolocation.getCurrentPosition(onRequestSuccess)

    return { updatedat: currentPositionUpdatedAt, sendGeolocation: requestGeolocation }
}