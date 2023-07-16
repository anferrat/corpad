import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import SevenSegmentView from '../../../../components/SevenSegmentDisplay'
import { Icon, Text } from '@ui-kitten/components'
import { basic1000, primary } from '../../../../styles/colors'

const marginLeft = Dimensions.get('window').width / (14 * 2.3) + 8
const CycleDisplayView = ({ label, icon, value }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Icon
                    fill={primary}
                    name={icon}
                    pack='cp'
                    style={{ ...styles.icon, marginLeft: marginLeft }} />
                <Text category='label' appearance='hint'>{label}</Text>
            </View>
            <SevenSegmentView
                onColor={basic1000}
                size='small'
                value={value} />
        </View>
    )
}

export default React.memo(CycleDisplayView)

const styles = StyleSheet.create({
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 8
    },
    icon: {
        width: 18,
        height: 18,
        marginRight: 8,
        marginLeft: 24
    }
})