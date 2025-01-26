import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import UnpairedView from './components/UnpairedView'
import PairedView from './components/PairedView'
import useMultimeter from './hooks/useMultimeter'
import LoadingView from '../../../../components/LoadingView'


const Multimeter = ({ navigateToMultimeterCycleSettings, goBack, navigateToMultimeterModal }) => {
    const { paired, initialBleState, isLoading } = useMultimeter({ goBack })

    return (
        <LoadingView
            loading={isLoading}>
            <ScrollView>
                {paired ?
                    <PairedView
                        navigateToMultimeterModal={navigateToMultimeterModal}
                        navigateToCycleSettings={navigateToMultimeterCycleSettings} /> :
                    <UnpairedView
                        initialBleState={initialBleState} />
                }
            </ScrollView>
        </LoadingView>
    )
}

export default Multimeter

