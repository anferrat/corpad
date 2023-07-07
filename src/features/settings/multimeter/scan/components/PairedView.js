import React from "react"
import { View, StyleSheet } from "react-native"
import { Icon, ListItem, Text } from "@ui-kitten/components"
import { primary } from '../../../../../styles/colors'
import { globalStyle } from "../../../../../styles/styles"
import { MultimeterTypeLabels } from "../../../../../constants/labels"
import StatusView from "./StatusView"
import { connectIcon, optionIcon, trashIcon, activity } from "../../../../../components/Icons"


const PairedView = ({ name, type, connected, connecting, connect, unpair, navigateToCycleSettings }) => {
    console.log(navigateToCycleSettings)
    return (
        <View style={globalStyle.card}>
            <Text
                category='label'
                appearance='hint'>
                {'Paired device'}
            </Text>
            <View
                style={styles.mainView}>
                <View style={styles.titleView}>
                    <Icon
                        name='radio'
                        fill={primary}
                        style={styles.icon} />
                    <View>
                        <Text
                            category='h6'>
                            {name}
                        </Text>
                        <Text
                            category='s2'
                            appearance='hint'>
                            {MultimeterTypeLabels[type]}
                        </Text>
                    </View>
                </View>

                <StatusView
                    connected={connected}
                    connecting={connecting}
                />
            </View>
            {!connected ?
                <ListItem
                    style={styles.listItem}
                    onPress={connect}
                    disabled={connecting}
                    accessoryLeft={connecting ? activity : connectIcon}
                    title={'Connect'}
                    description={'Press button on PokitPro to wake it up before connecting'} /> : null}
            <ListItem
                style={styles.listItem}
                accessoryLeft={optionIcon}
                title={'Cycle settings'}
                onPress={navigateToCycleSettings}
                description='Adjust ON/OFF time cycles for potentials capture' />
            <ListItem
                style={styles.listItem}
                title={'Unpair'}
                onPress={unpair}
                accessoryLeft={trashIcon} />
        </View>
    )
}

export default React.memo(PairedView)


const styles = StyleSheet.create({
    mainView: {
        marginTop: 4,
        height: 80,
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 8,
    },
    titleView: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    icon: {
        marginRight: 12,
        width: 40,
        height: 40
    },
    listItem: {
        marginHorizontal: -12,
        height: 60,
    }
})