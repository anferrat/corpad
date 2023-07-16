import React from 'react'
import { View, StyleSheet } from 'react-native'
import useSubitemListData from './hooks/useSubitemListData'
import SubitemViewFactory from './components/SubitemFactory'
import { globalStyle } from '../../styles/styles'
import LoadingView from '../../components/LoadingView'
import useSubitemListActions from './hooks/useSubitemListActions'


const SubitemListView = ({ itemId, itemType, navigateToEditSubitem }) => {
    const { potentialUnit, potentialHint, subitems, pipelineList, loading, multimeterPaired, idMap, dispatch, onMultimeterPress } = useSubitemListData({ itemId, itemType })
    const { validatePotential, updatePotentialValue, updatePropertyValue, validateCouponCurrent, validateVoltageDrop, validateCurrent, updateShorted, validateVoltage } = useSubitemListActions(dispatch)

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
                        multimeterPaired={multimeterPaired}
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