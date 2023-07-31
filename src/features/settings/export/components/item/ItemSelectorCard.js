import React, { useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { ItemTypeLabelsPlural } from '../../../../../constants/labels'
import { ItemTypeIconsFilled } from '../../../../../constants/icons'
import { control, basic, primary, basic300 } from '../../../../../styles/colors'
import Pressable from '../../../../../components/Pressable'

const ItemSelectorCard = ({ onPress, selectedItemType, itemType }) => {
    const selected = selectedItemType === itemType
    const onPressHandler = useCallback(() => onPress(itemType), [itemType, onPress])
    const title = ItemTypeLabelsPlural[itemType]
    const icon = ItemTypeIconsFilled[itemType]

    return (
        <Pressable
            disabled={selected}
            onPress={onPressHandler}
            style={selected ? styles.containerSelected : styles.container}>
            <Icon
                name={icon}
                pack={'cp'}
                style={styles.icon}
                fill={selected ? control : basic} />
            <Text
                style={styles.text}
                category='p1'
                numberOfLines={1}
                ellipsizeMode={'tail'}
                status={selected ? 'control' : 'basic'}>
                {title}
            </Text>

        </Pressable>
    )
}

export default ItemSelectorCard

const containerStyles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: control,
        borderRadius: 20,
        marginHorizontal: 6,
        marginBottom: 6,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: basic300
    }
})

const styles = StyleSheet.create({
    container: StyleSheet.compose(containerStyles.container),
    containerSelected: StyleSheet.compose(containerStyles.container,
        {
            backgroundColor: primary
        }),
    icon: {
        width: 24,
        height: 24,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8
    },
    text: {
        marginTop: 6,
        textAlign: 'center'
    }
})



