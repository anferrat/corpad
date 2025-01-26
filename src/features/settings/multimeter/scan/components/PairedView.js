import React from "react"
import { View, StyleSheet } from "react-native"
import { Divider, Icon, ListItem, Text } from "@ui-kitten/components"
import { basic, danger, primary } from '../../../../../styles/colors'
import { globalStyle } from "../../../../../styles/styles"
import { MultimeterTypeLabels } from "../../../../../constants/labels"
import StatusView from "./StatusView"
import { activity } from "../../../../../components/Icons"
import TimeSyncListItem from "./TimeSyncListItem"
import usePairedView from "../hooks/usePairedView"

const trashIcon = (props) => <Icon {...props} name='trash' fill={danger} />

const trashIconDisabled = (props) => <Icon {...props} name='trash' fill={basic} />

const optionIcon = (props) => <Icon name='options' {...props} fill={primary} />

const connectIcon = (props) => <Icon name='link-2' {...props} fill={primary} />

const modalIcon = (props) => <Icon name='radio' {...props} fill={primary} />

const PairedView = ({ navigateToCycleSettings, navigateToMultimeterModal }) => {
    const { name, type, connected, connecting, unpair, connect, unpairing } = usePairedView()
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
                    connecting={connecting} />
            </View>
            <Divider />
            <View style={styles.list}>
                {!connected ?
                    <ListItem
                        style={styles.listItem}
                        onPress={connect}
                        disabled={connecting}
                        accessoryLeft={connecting ? activity : connectIcon}
                        title={connecting ? 'Connecting' : 'Connect'}
                        description={connecting ? null : 'Make sure multimeter is ready to connect'} /> : null}
                <TimeSyncListItem />
                <ListItem
                    disabled={connecting}
                    style={styles.listItem}
                    title={'Open multimeter'}
                    onPress={navigateToMultimeterModal}
                    accessoryLeft={modalIcon} />
                <ListItem
                    style={styles.listItem}
                    accessoryLeft={optionIcon}
                    title={'Settings'}
                    onPress={navigateToCycleSettings}
                    description='Adjust ON/OFF time cycles, capture rate and mode' />
                <ListItem
                    disabled={connecting}
                    style={styles.listItem}
                    title={'Unpair'}
                    onPress={unpair}
                    accessoryLeft={unpairing ? activity : (connecting ? trashIconDisabled : trashIcon)} />
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