import React from 'react'
import MapButton from './components/MapButton'
import { useDispatch, useSelector } from 'react-redux'
import { setSatellite } from '../../store/actions/map'

const SatelliteButton = () => {
    const satelliteOn = useSelector(state => state.map.satellite)
    const dispatch = useDispatch()

    const updateSatellite = () => dispatch(setSatellite(!satelliteOn))
    return (
        <MapButton
            onPress={updateSatellite}
            icon={satelliteOn ? 'globe-2' : 'globe-2-outline'} />
    )
}
export default React.memo(SatelliteButton)

