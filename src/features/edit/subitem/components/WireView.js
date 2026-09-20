import React from 'react'
import { StyleSheet, View } from 'react-native'
import SelectField from "../../../../components/Select"
import { WireColors, WireGauges } from '../../../../constants/global'
import { WireColorLabels, WireGaugeLabels } from '../../../../constants/labels'
import { WireColorColors } from '../../../../styles/colors'

const WireView = ({ update, wireColor, wireGauge }) => {
    const wireColorList = React.useMemo(() => Object.values(WireColors).map(color => ({ index: color, item: WireColorLabels[color] })), [])
    const colorAccessories = React.useMemo(() => wireColorList.map(({ index }) => ({ icon: WireColorColors[index].length > 1 ? 'color-circle-double' : 'color-circle', fill: WireColorColors[index][0], fill2: WireColorColors[index][1], pack: 'cp' })), [wireColorList])
    const wireGaugeList = React.useMemo(() => Object.values(WireGauges).map(gauge => ({ index: gauge, item: WireGaugeLabels[gauge] })), [])
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
                    itemList={wireColorList}
                    />
            </View>
            <View style={styles.selectSize}>
                <SelectField
                    placeholderOption={true}
                    onSelect={onSelectGauge}
                    property='wireGauge'
                    selectedIndex={wireGauge}
                    itemList={wireGaugeList}
                    />
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
        flex: .9,
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
