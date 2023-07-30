import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Popover, Text, Icon } from '@ui-kitten/components'
import { basic, basic300, control } from '../../../../styles/colors'
import { androidRipple } from '../../../../styles/styles'
import Pressable from '../../../../components/Pressable'


const PotentialLabel = ({
    referenceCellList,
    potentialTypes,
    referenceCellIndex,
    potentialTypeIndex
}) => {
    const [visible, setVisible] = useState(false)

    const refCellName = referenceCellList ? (referenceCellList[referenceCellIndex]?.name ?? 'Error') : 'Error'
    const potentialTypeName = potentialTypes ? (potentialTypes[potentialTypeIndex]?.name ?? null) : 'null'

    const renderAnchor = React.useCallback(() => {
        return <View style={styles.anchor}>
            <Pressable onPress={setVisible.bind(this, true)} style={styles.pressable} android_ripple={androidRipple}>
                <Text appearance='hint' ellipsizeMode='tail' numberOfLines={1}>{potentialTypeName}</Text>
            </Pressable>
        </View>
    }, [])

    const hidePopover = React.useCallback(() => setVisible(false), [])
    return (
        <Popover
            placement={'top end'}
            style={styles.pop}
            onBackdropPress={hidePopover}
            anchor={renderAnchor}
            visible={visible}>
            <>
                <View style={styles.popRow}>
                    <Icon name='grid' style={styles.icon} fill={basic} />
                    <Text category='s2' numberOfLines={1} ellipsizeMode={'tail'} appearance='hint'>{potentialTypeName}</Text>
                </View>
                <View style={styles.popRow}>
                    <Icon name='RE' pack='cp' style={styles.icon} fill={basic} />
                    <Text category='s2' numberOfLines={1} ellipsizeMode={'tail'} appearance='hint'>{refCellName}</Text>
                </View>
            </>
        </Popover>
    )

}

export default PotentialLabel

const styles = StyleSheet.create({
    anchor: {
        width: 70,
        marginRight: 12,
        borderColor: basic300,
        backgroundColor: control,
        borderRadius: 10,
        overflow: 'hidden'
    },
    pressable: {
        paddingHorizontal: 12,
        paddingVertical: 6
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 6
    },
    pop: {
        borderColor: basic300,
        borderWidth: 1,
        maxWidth: 300,
        padding: 12,
        paddingBottom: 0,
        backgroundColor: control,

    },
    popRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 12
    }
})