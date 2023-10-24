import React from 'react'
import { StyleSheet } from 'react-native'
import useSubitemData from './hooks/useSubitemData'
import LoadingView from '../../../components/LoadingView'
import SubitemViewFactory from './components/SubitemViewFactory'
import useSubitemActions from './hooks/useSubitemActions'


const SubitemView = ({ itemId, subitemId, subitemType, isNew }) => {
    const subitemData = useSubitemData({ itemId, subitemId, subitemType, isNew })
    const { update,
        validate,
        updateShortedHandler,
        updateRatioHandler,
        validateRatioHandler,
        updateFactorHandler,
        validateFactorHandler,
        validateVoltageDropHandler,
        validateCouponHandler,
        addSoilResistivityLayerHandler,
        deleteSoilResistivityLayerHandler,
        updateSubProperty,
        validateSubProperty,
        updateSpacingUnit,
        addAnodeBedAnodeHandler,
        deleteAnodeBedAnodeHandler,
        updateAnodeWireProperties } = useSubitemActions()
    const { loading, pipelineList, subitemList } = subitemData
    return (
        <LoadingView loading={loading} style={styles.loading}>
            <SubitemViewFactory
                update={update}
                validate={validate}
                updateShortedHandler={updateShortedHandler}
                validateRatioHandler={validateRatioHandler}
                updateFactorHandler={updateFactorHandler}
                validateFactorHandler={validateFactorHandler}
                validateVoltageDropHandler={validateVoltageDropHandler}
                validateCouponHandler={validateCouponHandler}
                updateRatioHandler={updateRatioHandler}
                addSoilResistivityLayerHandler={addSoilResistivityLayerHandler}
                deleteSoilResistivityLayerHandler={deleteSoilResistivityLayerHandler}
                updateSubProperty={updateSubProperty}
                validateSubProperty={validateSubProperty}
                updateSpacingUnit={updateSpacingUnit}
                addAnodeBedAnodeHandler={addAnodeBedAnodeHandler}
                deleteAnodeBedAnodeHandler={deleteAnodeBedAnodeHandler}
                updateAnodeWireProperties={updateAnodeWireProperties}
                addSubi
                itemId={itemId}
                subitemId={subitemId}
                type={subitemType}
                pipelineList={pipelineList}
                subitemList={subitemList}
                data={subitemData} />
        </LoadingView>
    )
}

export default SubitemView

const styles = StyleSheet.create({
    loading: {
        height: 250
    }
})