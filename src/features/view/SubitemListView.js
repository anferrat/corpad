import React from 'react'
import { View, StyleSheet } from 'react-native'
import useSubitemListData from './hooks/useSubitemListData'
import SubitemViewFactory from './components/SubitemFactory'
import { globalStyle } from '../../styles/styles'
import LoadingView from '../../components/LoadingView'
import useSubitemListActions from './hooks/useSubitemListActions'
import useMultimeterDataListener from './hooks/useMultimeterDataListener'


const SubitemListView = ({ itemId, itemType, navigateToEditSubitem }) => {
    const { potentialUnit, potentialHint, subitems, pipelineList, loading, availableMeasurementTypes, idMap, dispatch } = useSubitemListData({ itemId, itemType })
    const { validatePotential, updatePotentialValue, updatePropertyValue, validateCouponCurrent, validateVoltageDrop, validateCurrent, updateShorted, validateVoltage } = useSubitemListActions(dispatch)
    const { onMultimeterPress } = useMultimeterDataListener({ itemId, dispatch, potentialUnit })
    return (
        <LoadingView
            loading={loading}
            style={styles.loading}>
            {subitems.map((subitem, index) => (
                <View
                    key={subitem.uid}
                    style={globalStyle.card}>
                    <SubitemViewFactory
                        subitem={subitem}
                        availableMeasurementTypes={availableMeasurementTypes}
                        idMap={idMap}
                        subitemIndex={index}
                        navigateToEditSubitem={navigateToEditSubitem}
                        potentialUnit={potentialUnit}
                        potentialHint={potentialHint}
                        pipelineList={pipelineList}
                        updateShorted={updateShorted}
                        validateVoltage={validateVoltage}
                        validatePotential={validatePotential}
                        updatePotentialValue={updatePotentialValue}
                        updatePropertyValue={updatePropertyValue}
                        validateCouponCurrent={validateCouponCurrent}
                        validateVoltageDrop={validateVoltageDrop}
                        validateCurrent={validateCurrent}
                        onMultimeterPress={onMultimeterPress} />
                </View>
            )
            )}
        </LoadingView>
    )
}
export default SubitemListView


const styles = StyleSheet.create({
    loading: {
        minHeight: 300
    }
})