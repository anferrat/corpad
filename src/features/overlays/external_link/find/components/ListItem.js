import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import { basic, primary } from '../../../../../styles/colors'
import { androidRipple } from '../../../../../styles/styles'
import { ItemTypeLabels, LengthUnitLabels, TestPointTypeLabels } from '../../../../../constants/labels'
import { StatusColors } from '../../../../../styles/colors'
import Pressable from '../../../../../components/Pressable'
import { ItemTypes, LengthUnits } from '../../../../../constants/global'
import { ItemTypeIconsFilled, TestPointTypeIconsFilled } from '../../../../../constants/icons'

const ListItem = ({ id, name, testPointType, status, navigateToView, value, itemType, checked }) => {

    const onPress = React.useCallback(() => navigateToView(id), [id, navigateToView])

    const icon = itemType === ItemTypes.RECTIFIER ? ItemTypeIconsFilled[ItemTypes.RECTIFIER] : TestPointTypeIconsFilled[testPointType]
    const label = itemType === ItemTypes.RECTIFIER ? ItemTypeLabels[ItemTypes.RECTIFIER] : TestPointTypeLabels[testPointType]
    return (
        <Pressable
            android_ripple={androidRipple}
            style={styles.pressable}
            onPress={onPress}>
            <View
                style={styles.mainView}>
                {status !== null ?
                    <Icon
                        name='circle'
                        pack='cp'
                        fill={StatusColors[status]}
                        style={styles.statusIcon}
                    /> : null}
                <Icon
                    name={icon}
                    pack='cp'
                    style={styles.icon}
                    fill={primary} />
                <View style={styles.titleView}>
                    <Text
                        category='p1'>
                        {name}
                    </Text>
                    <Text
                        category='s2'
                        appearance='hint'>
                        {label}
                    </Text>
                </View>
            </View>
            {checked ?
                <Icon
                    style={styles.checkIcon}
                    fill={primary}
                    name='checkmark-circle-2'
                /> : null}
            {value !== undefined && value !== null ?
                <Text
                    appearance='hint'>
                    {value} {LengthUnitLabels[LengthUnits.METERS]}
                </Text>
                : null}
        </Pressable>
    )
}

export default ListItem

const styles = StyleSheet.create({
    pressable: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 6,
        paddingHorizontal: 14,
    },
    mainView: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleView: {
        justifyContent: 'center',
    },
    icon: {
        height: 28,
        width: 28,
        marginRight: 12
    },
    statusIcon: {
        width: 15,
        height: 15,
        marginRight: 6
    },
    checkIcon: {
        height: 20,
        width: 20,
        marginRight: 16
    }
})