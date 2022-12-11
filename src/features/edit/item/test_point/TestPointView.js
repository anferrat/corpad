import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Layout, Icon } from '@ui-kitten/components'
import { basic } from '../../../../styles/colors'
import { testPointTypeCodes, testPointTypes } from '../../../../constants/constants'
import StatusView from '../StatusView'
import InputField from '../InputField'
import SelectField from '../SelectField'
import LocationView from '../LocationView'
import AddButton from '../AddButton'


const TestPointView = (props) => {
    const accessoryList = React.useMemo(() => testPointTypeCodes.map(code =>
        <Icon pack='cp' name={code} fill={basic}
            style={styles.icon} />), [])
    return (
        <>
            <StatusView
                status={props.tpData.status} />
            <Layout style={styles.card}>
                <View style={styles.mainView}>
                    <InputField
                        maxLength={40}
                        value={props.tpData.name}
                        valid={props.tpData.valid.name}
                        property='name'
                        label='Name'
                        placeholder={props.tpData.defaultName} />
                    <SelectField
                        accessoryList={accessoryList}
                        valid={props.tpData.valid.testPointType}
                        property='testPointType'
                        itemsList={testPointTypes}
                        selectedItem={props.tpData.testPointType}
                        placeholder="Select type"
                        label='Test point type' />
                    <LocationView
                        latitude={props.tpData.latitude}
                        longitude={props.tpData.longitude}
                        latValid={props.tpData.valid.latitude}
                        lonValid={props.tpData.valid.longitude} />
                    <InputField
                        maxLength={80}
                        isTestPoint={true}
                        valid={props.tpData.valid.location}
                        label='Location'
                        value={props.tpData.location}
                        property='location'
                        placeholder='Location description' />
                    <InputField
                        maxLength={300}
                        multiline={true}
                        valid={props.tpData.valid.comment}
                        textAlignVertical={'top'}
                        numberOfLines={3}
                        isTestPoint={true}
                        label='Comments'
                        value={props.tpData.comment}
                        property='comment'
                        placeholder='Type your comments here' />
                </View>
                <AddButton
                    itemId={props.testPointId}
                    navigateToSubitem={props.navigateToSubitem}
                    itemType={'TEST_POINT'}
                />
            </Layout>
        </>
    )
}

export default TestPointView

const styles = StyleSheet.create({
    mainView: {
        padding: 12
    },
    icon: {
        width: 20,
        height: 20,
    },
    card: {
        overflow: "hidden",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        borderWidth: 0,
        borderRadius: 6,
        margin: 6,
        marginTop: 12
    }
})

