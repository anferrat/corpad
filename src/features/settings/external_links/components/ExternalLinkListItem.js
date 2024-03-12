import React from "react"
import { View, StyleSheet } from "react-native"
import { Icon, Text } from "@ui-kitten/components"
import { basic, basic300, primary } from '../../../../styles/colors'
import { androidRipple } from "../../../../styles/styles"
import Pressable from "../../../../components/Pressable"
import { getFullDate } from "../../../../helpers/functions"
import { ItemTypeLabels } from "../../../../constants/labels"
import { ExternalLinkTypeIcons } from "../../../../constants/icons"

const ExternalLinkListItem = ({ name, timeRecorded, itemType, linkType, onPress, link }) => {
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
                <View>
                    <View>
                        <Text
                            category='p1'>
                            {name}
                        </Text>
                        <Text
                            category='s2'
                            appearance='hint'>
                            Scanned on {getFullDate(timeRecorded)}
                        </Text>
                    </View>
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
        height: 60,
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
    icon: {
        marginRight: 12,
        marginLeft: 6,
        width: 35,
        height: 35
    },
    arrow: {
        width: 22,
        height: 22
    }
})