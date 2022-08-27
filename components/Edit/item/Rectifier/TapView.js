import React, { useEffect } from 'react'
import InputField from '../InputField'
import SelectField from '../SelectField'
import { tapSettings, tapOptions } from '../../../../constants/constants'
import { Layout } from '@ui-kitten/components'
import { useDispatch } from 'react-redux'
import { updateProperty } from '../../../../store/actions/item'


const TapView = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        if (props.rectifierData.tapCoarse !== null && props.rectifierData.tapSetting !== 0)
            dispatch(updateProperty(null, 'tapCoarse', true))
        if (props.rectifierData.tapFine !== null && props.rectifierData.tapSetting !== 0)
            dispatch(updateProperty(null, 'tapFine', true))
        if (props.rectifierData.tapValue !== null && props.rectifierData.tapSetting !== 1)
            dispatch(updateProperty(null, 'tapValue', true))
    }, [props.rectifierData.tapCoarse, props.rectifierData.tapFine, props.rectifierData.tapValue, props.rectifierData.tapSetting])

    return (
        <>
            <SelectField
                label='Current control'
                property='tapSetting'
                selectedItem={props.rectifierData.tapSetting}
                itemsList={tapSettings}
                placeholder='Select control mode' />
            <TapOption
                rectifierData={props.rectifierData}
                type={props.rectifierData.tapSetting}
            />
        </>
    )
}

export default React.memo(TapView)

const TapOption = React.memo((props) => {
    switch (props.type) {
        case 0:
            return <Layout style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 12 }}>
                <SelectField
                    style={{ flex: 1, paddingRight: 6 }}
                    label='Coarse'
                    property='tapCoarse'
                    selectedItem={props.rectifierData.tapCoarse}
                    itemsList={tapOptions}
                    placeholder='#' />
                <SelectField
                    style={{ flex: 1, paddingLeft: 6 }}
                    label='Fine'
                    property='tapFine'
                    selectedItem={props.rectifierData.tapFine}
                    itemsList={tapOptions}
                    placeholder='#'
                />
            </Layout>
        case 1:
            return <InputField
                property='tapValue'
                maxLength={8}
                label='Percentage'
                placeholder='##'
                keyboardType='numeric'
                value={props.rectifierData.tapValue}
                valid={props.rectifierData.valid.tapValue}
                unit='%' />
        default:
            return null
    }
})