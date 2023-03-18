import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import { basic } from '../../../styles/colors'
import { labels, testPointTypeCodes } from '../../../constants/constants'

const ItemTitleView = ({ title, itemType, testPointType }) => {
    const icon = itemType === 'TEST_POINT' ? testPointTypeCodes[testPointType] : itemType
    const subtitle = labels[icon].label
    return (
        <View
            style={styles.mainView}>
            <Text
                category='h4'
                numberOfLines={1}
                ellipsizeMode='tail'>{title}</Text>
            <View
                style={styles.subtitleView}>
                <Text
                    category='p1'
                    appearance='hint'>
                    {subtitle}</Text>
                <Icon
                    fill={basic}
                    style={styles.icon}
                    pack={'cp'}
                    name={icon} />
            </View>
        </View>
    )
}

export default ItemTitleView

const styles = StyleSheet.create({
    mainView: {
        paddingRight: 24,
        flex: 1
    },
    subtitleView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        height: 20,
        width: 20,
        marginLeft: 8
    }
})