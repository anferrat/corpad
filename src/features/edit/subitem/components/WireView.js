import React from 'react'
import { StyleSheet, View } from 'react-native'
import SelectField from "../../../../components/Select2"
import { wireColorList, wireGaugesList } from '../../../../constants/constants.js'

const colorNames = wireColorList.map(({ title }) => title)
const colorAccessories = wireColorList.map(({ color }) => ({ icon: color.length > 1 ? 'color-circle-double' : 'color-circle', fill: color[0], fill2: color[1], pack: 'cp' }))

const WireView = ({ update, wireColor, wireGauge }) => {
    const onSelectColor = React.useCallback((index) => {
        update(index, 'wireColor')
    }, [update])

    const onSelectGauge = React.useCallback((index) => {
        update(index, 'wireGauge')
    }, [update])
    return (
        <View style={styles.selectGroup}>
            <View style={styles.selectColor}>
                <SelectField
                    placeholderOption={true}
                    onSelect={onSelectColor}
                    accessoryList={colorAccessories}
                    property='wireColor'
                    selectedIndex={wireColor}
                    itemList={colorNames}
                    placeholder="Color"
                    label="Wire color" />
            </View>
            <View style={styles.selectSize}>
                <SelectField
                    placeholderOption={true}
                    onSelect={onSelectGauge}
                    property='wireGauge'
                    selectedIndex={wireGauge}
                    itemList={wireGaugesList}
                    placeholder='Gauge'
                    label='Wire gauge' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    selectColor: {
        flex: 1,
        paddingRight: 6
    },
    selectSize:
    {
        flex: .7,
        paddingLeft: 6
    },
    icon: {
        width: 25,
        height: 25,
    },
    selectGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 12
    }
})


export default React.memo(WireView)