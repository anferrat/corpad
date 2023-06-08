import React from "react"
import { View, StyleSheet, Pressable, ActivityIndicator } from "react-native"
import { Icon, Text } from "@ui-kitten/components"
import { basic, basic300, danger, primary, success } from '../../../../styles/colors'
import { androidRipple } from "../../../../styles/styles"
import { MultimeterTypeLabels } from "../../../../constants/labels"
import IconButton from "../../../../components/IconButton"


const PairedMultimeterView = ({ name, type, connected, connecting, connect, unpair, paired }) => {
    const statusLabel = connecting ? 'Connecting ' : (connected ? 'Connected ' : 'Disconnected ')
    if (paired)
        return (
            <>
                <Text appearance='hint' category='label'>Paired multimeter</Text>
                <Pressable
                    onPress={connect}
                    style={styles.mainView}
                    android_ripple={androidRipple}>
                    <View style={styles.titleView}>
                        <Icon
                            name='radio'
                            fill={primary}
                            style={styles.icon} />
                        <View>
                            <Text
                                category='p1'>
                                {name}
                            </Text>
                            <View>
                                <View style={styles.connectedLine}>
                                    {connecting ?
                                        <ActivityIndicator
                                            color={primary}
                                            size={'small'}
                                            style={styles.activityIndicator} /> :
                                        <Icon
                                            name='color-circle'
                                            pack='cp'
                                            fill={connected ? success : basic}
                                            style={styles.statusIcon} />}
                                    <Text
                                        category='s2'
                                        appearance='hint'>
                                        {statusLabel}
                                    </Text>
                                    <Text
                                        category='s2'
                                        appearance='hint'>
                                        | {MultimeterTypeLabels[type]}
                                    </Text>
                                </View>

                            </View>
                        </View>
                    </View>
                    <View>
                        <IconButton
                            onPress={unpair}
                            color={danger}
                            iconName={'trash-2-outline'} />
                    </View>
                </Pressable>
            </>
        )
    else return null
}

export default React.memo(PairedMultimeterView)

const styles = StyleSheet.create({
    mainView: {
        marginTop: 4,
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
    icon: {
        marginRight: 12,
        marginLeft: 6,
        width: 30,
        height: 30
    },
    connectedLine: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    statusIcon: {
        width: 12,
        height: 12,
        marginRight: 4
    },
    activityIndicator: {
        marginRight: 4
    }
})