import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { basic } from '../../../styles/colors'

const SingleSideDisplay = ({ subitems }) => {

    const isEmpty = subitems.length === 0

    const renderSubitemTitle = ({ id, name, type }) => (
        <View
            style={styles.listItem}
            key={id}>
            <Icon
                name={type}
                pack='cp'
                style={styles.listIcon}
                fill={basic} />
            <Text
                style={styles.listText}
                numberOfLines={1}
                ellipsizeMode='tail'
                appearance='hint'>{name}</Text>
        </View>
    )

    if (isEmpty)
        return (
            <View style={styles.listItem}>
                <Icon name='slash-outline' fill={basic} style={styles.listIcon} />
                <Text style={styles.listText} appearance='hint'>No items</Text>
            </View>
        )
    else return (
        <>
            {subitems.map(renderSubitemTitle)}
        </>
    )
}

export default React.memo(SingleSideDisplay)

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6
    },
    listText: {
        fontSize: 13,
        lineHeight: 25
    },
    listIcon: {
        width: 15,
        height: 15,
        marginRight: 6
    }
})
