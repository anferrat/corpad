import React from 'react'
import { StyleSheet } from 'react-native'
import SelectField from "../SelectField"
import { Layout } from '@ui-kitten/components'
import { wireColorList, wireGaugesList } from '../../../../constants/constants.js'
import WireColorIcon from '../../../_Stateless/WireColorIcon'

const WireView = (props) => {
    const colorAccessories = React.useMemo(() => wireColorList.map(color => <WireColorIcon colorIndex={color.index} style={styles.icon} />), [])
    const colorNames = React.useMemo(() => wireColorList.map(color => color.title), [])
    return (
        <Layout style={styles.selectGroup}>
            <Layout style={styles.selectColor}>
                <SelectField
                    accessoryList={colorAccessories}
                    property='wireColor'
                    selectedItem={props.selectedColor}
                    itemsList={colorNames}
                    placeholder="Color"
                    label="Wire color" />
            </Layout>
            <Layout style={styles.selectSize}>
                <SelectField
                    property='wireGauge'
                    selectedItem={props.selectedGauge}
                    itemsList={wireGaugesList}
                    placeholder='Gauge'
                    label='Wire gauge' />
            </Layout>
        </Layout>
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
    }
})


export default React.memo(WireView)