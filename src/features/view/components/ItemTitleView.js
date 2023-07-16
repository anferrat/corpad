import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import { basic } from '../../../styles/colors'
import { ItemTypes } from '../../../constants/global'
import { ItemTypeIcons, TestPointTypeIcons } from '../../../constants/icons'
import { ItemTypeLabels, TestPointTypeLabels } from '../../../constants/labels'

const ItemTitleView = ({ title, itemType, testPointType }) => {
    const tpIcon = TestPointTypeIcons[testPointType]
    const icon = itemType === ItemTypes.TEST_POINT && tpIcon ? tpIcon : ItemTypeIcons[itemType]
    const subtitle = itemType === ItemTypes.TEST_POINT && tpIcon ? TestPointTypeLabels[testPointType] : ItemTypeLabels[itemType]
    return (
        <View
            style={styles.mainView}>
            <Text
                category='h4'
                numberOfLines={1}
                ellipsizeMode='tail'>{title}</Text>
            <View
                style={styles.subtitleView}>
                <Icon
                    fill={basic}
                    style={styles.icon}
                    pack={'cp'}
                    name={`${icon}-filled`} />
                <Text
                    category='p1'
                    appearance='hint'>
                    {subtitle}</Text>

            </View>
        </View>
    )
}

export default React.memo(ItemTitleView)

const styles = StyleSheet.create({
    mainView: {
        marginRight: 24,
        flex: 1,
    },
    subtitleView: {
        paddingTop: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        height: 18,
        width: 18,
        marginRight: 4
    }
})