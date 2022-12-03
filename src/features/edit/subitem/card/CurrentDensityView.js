import React from 'react'
import { Layout } from '@ui-kitten/components'
import { useDispatch } from 'react-redux'
import InputField from '../InputField'
import { updateSubitemProperty } from '../../../../store/actions/subitem'
import { calculateCouponDensity } from '../../../../helpers/functions'

const areaUnit = {
    main: 'cm',
    script: '2',
    format: 'super'
}

const densityUnit = {
    main: 'A/m',
    script: '2',
    format: 'super'
}

const CurrentDensityView = (props) => {
    const dispatch = useDispatch()
    const updateDensity = React.useCallback((current, area) => dispatch(updateSubitemProperty(calculateCouponDensity(current, area), 'density')), [dispatch])
    return (
        <>
            <Layout style={{ flexDirection: 'row' }}>
                <Layout style={{ flex: 1, marginRight: 6 }}>
                    <InputField
                        placeholder=''
                        keyboardType='numeric'
                        property='current'
                        maxLength={8}
                        label='Coupon current'
                        value={props.current}
                        unit={'\u00B5A'}
                        calculations={updateDensity.bind(this, props.current, props.area)}
                        valid={props.valid?.current} />
                </Layout>
                <Layout style={{ flex: 1, marginLeft: 6 }}>
                    <InputField
                        placeholder=''
                        property='area'
                        keyboardType='numeric'
                        maxLength={8}
                        label='Coupon area'
                        value={props.area}
                        unit={areaUnit}
                        calculations={updateDensity.bind(this, props.current, props.area)}
                        valid={props.valid.area} />
                </Layout>
            </Layout>
            <InputField
                placeholder='Not enough data to calculate'
                property='density'
                maxLength={8}
                disabled={true}
                label='Density'
                value={props.density}
                unit={densityUnit}
                valid={true}
            />
        </>
    )
}

export default React.memo(CurrentDensityView)