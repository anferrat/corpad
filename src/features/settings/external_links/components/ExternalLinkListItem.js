import React from "react"
import { View, StyleSheet } from "react-native"
import { Icon, Text } from "@ui-kitten/components"
import { basic, basic300, primary } from '../../../../styles/colors'
import { androidRipple } from "../../../../styles/styles"
import Pressable from "../../../../components/Pressable"
import { getFullDate } from "../../../../helpers/functions"
import { ExternalLinkTypeIcons } from "../../../../constants/icons"
import { ExternalLinkTypeLabels, ItemTypeLabels } from "../../../../constants/labels"

const ExternalLinkListItem = ({ name, timeRecorded, linkType, itemType, onPress, link }) => {
    const onPressHandler = () => onPress(link)
    return (
        <Pressable
            onPress={onPressHandler}
            style={styles.mainView}
            android_ripple={androidRipple} >
            <View
                style={styles.titleView}>
                <Icon
                    name={ExternalLinkTypeIcons[linkType]}
                    pack='cp'
                    fill={primary}
                    style={styles.icon} />
                <View
                    style={styles.titles}>
                    <Text
                        numberOfLines={1}
                        category='p1'>
                        {name}
                    </Text>
                    <Text
                        numberOfLines={1}
                        category='s2'
                        appearance='hint'>
                        {ItemTypeLabels[itemType]} | {ExternalLinkTypeLabels[linkType]}
                    </Text>
                    <Text
                        category='s2'
                        appearance='hint'
                        ellipsizeMode={'head'}
                        numberOfLines={1}>
                        Scanned on {getFullDate(timeRecorded)}
                    </Text>
                </View>
            </View>
            <Icon
                name={'arrow-ios-forward-outline'}
                fill={basic}
                style={styles.arrow} />
        </Pressable>
    )
}

export default React.memo(ExternalLinkListItem)

const styles = StyleSheet.create({
    mainView: {
        height: 80,
        flexDirection: "row",
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderRadius: 6,
        marginBottom: 8,
        borderColor: basic300,
    },
    titleView: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    titles: {
        flex: 1
    },
    icon: {
        marginRight: 12,
        marginLeft: 6,
        width: 40,
        height: 40
    },
    arrow: {
        width: 22,
        height: 22,
        marginLeft: 12
    },
})