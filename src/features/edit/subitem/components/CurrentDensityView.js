import React from 'react'
import { View, StyleSheet } from 'react-native'
import Input from '../../../../components/Input'

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

const CurrentDensityView = ({ current, area, currentValid, areaValid, density, update, validate }) => {

    const onChangeCurrent = React.useCallback((value) => update(value, 'current'), [update])

    const onChangeArea = React.useCallback((value) => update(value, 'area'), [update])

    const onEndEditingCurrent = React.useCallback(() => {
        validate('current')
    }, [validate])

    const onEndEditingArea = React.useCallback(() => {
        validate('area')
    }, [validate])


    return (
        <>
            <View style={styles.mainView}>
                <View style={styles.left}>
                    <Input
                        keyboardType='numeric'
                        property='current'
                        maxLength={8}
                        label='Coupon current'
                        value={current}
                        unit={'\u00B5A'}
                        valid={currentValid}
                        onChangeText={onChangeCurrent}
                        onEndEditing={onEndEditingCurrent} />
                </View>
                <View style={styles.right}>
                    <Input
                        property='area'
                        keyboardType='numeric'
                        maxLength={8}
                        label='Coupon area'
                        value={area}
                        unit={areaUnit}
                        valid={areaValid}
                        onChangeText={onChangeArea}
                        onEndEditing={onEndEditingArea} />
                </View>
            </View>
            <Input
                placeholder='Unable to calculate'
                property='density'
                maxLength={8}
                disabled={true}
                label='Density'
                value={density}
                unit={densityUnit}
                valid={true} />
        </>
    )
}

export default React.memo(CurrentDensityView)

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row'
    },
    left: {
        flex: 1,
        marginRight: 6,
    },
    right: {
        flex: 1,
        marginLeft: 6
    }
})