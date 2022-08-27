import React from 'react'
import StatusView from '../StatusView'
import InputField from '../InputField'
import SelectField from '../SelectField'
import LocationView from '../LocationView'
import AddReadingButton from './AddReadingButton'
import { Layout, Icon } from '@ui-kitten/components'
import { androidStyle, basic } from '../../../../styles/GlobalStyle'
import { testPointTypeCodes, testPointTypes } from '../../../../constants/constants'
import { View, StyleSheet } from 'react-native'



const TestPointView = (props) => {
    const accessoryList = React.useMemo(()=> testPointTypeCodes.map(code =>
        <Icon pack='cp' name={code} fill={basic}
            style={styles.icon} />), [])
    return (
        <>
            <StatusView
                status={props.tpData.status} />
            <Layout style={androidStyle.ConnectionCardMain}>
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
                <AddReadingButton
                    testPointType={props.tpData.testPointType}
                    navigateToCard={props.navigateToSubitem}
                    testPointId={props.testPointId} />
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
    }
})

