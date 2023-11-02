import React from "react"
import { View, StyleSheet } from "react-native"
import { Divider, Icon, ListItem, Text } from "@ui-kitten/components"
import { danger, primary } from '../../../../../styles/colors'
import { globalStyle } from "../../../../../styles/styles"
import { MultimeterTypeLabels } from "../../../../../constants/labels"
import StatusView from "./StatusView"
import { connectIcon, optionIcon, activity } from "../../../../../components/Icons"

const trashIcon = (props) => <Icon {...props} name='trash' fill={danger} />

const PairedView = ({ name, type, connected, connecting, connect, unpair, navigateToCycleSettings }) => {
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
            <Divider />
            <View style={styles.list}>
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
    },
    list: {
        paddingTop: 12
    }
})