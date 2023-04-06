import { useState, useEffect } from 'react'
import { watchPosition, clearWatch } from '../../../../app/controllers/survey/other/GeolocationController'
import { errorHandler } from '../../../../helpers/error_handler'

export const useLocation = (hideModal) => {
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        accuracy: null
    })

    useEffect(() => {
        let watchId
        const loadLocation = async () => {
            const { response } = await watchPosition(({ latitude, longitude, accuracy }) => setLocation({ latitude, longitude, accuracy }), er => errorHandler(er, hideModal))
            watchId = response
        }
        loadLocation()
        return () => {
            clearWatch(watchId)
        }
    }, [])

    return location
}
