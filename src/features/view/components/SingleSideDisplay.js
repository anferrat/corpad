import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { basic } from '../../../styles/colors'

export default SingleSideDisplay = (props) => {
    const displayNames = (cardList) => {
        if (cardList?.length && cardList?.length !== 0)
            return cardList.map(card => <View style={styles.listItem} key={card.id}>
                <Icon name={card?.type} pack='cp' style={styles.listIcon} fill={basic} />
                <Text style={styles.listText} numberOfLines={1} ellipsizeMode='tail' appearance='hint'>{card?.name}</Text>
            </View>)
        else return <View style={styles.listItem}>
            <Icon name='slash-outline' fill={basic} style={styles.listIcon} />
            <Text style={styles.listText} appearance='hint'>No items</Text>
        </View>
    }
    return <>
        {displayNames(props.sideCardList)}
    </>
}

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
