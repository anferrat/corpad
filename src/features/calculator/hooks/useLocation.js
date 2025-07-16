import { useState, useEffect } from 'react'
import { getLocationPermission, watchPosition } from '../../../app/controllers/survey/other/GeolocationController'
import { errorHandler } from '../../../helpers/error_handler'

export const useLocation = (hideModal) => {
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        accuracy: null
    })

    useEffect(() => {
        let removeWatch
        const loadData = async () => {
            const { status } = await getLocationPermission()
            if (status === 200) {
                removeWatch = watchPosition(({ latitude, longitude, accuracy }) => setLocation({ latitude, longitude, accuracy }),
                    er => errorHandler(er, hideModal)).response
            }
            else {
                errorHandler(902)
                hideModal()
            }
        }
        loadData()
        return () => {
            if (removeWatch)
                removeWatch()
        }
    }, [])

    return location
}
