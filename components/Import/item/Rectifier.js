import React from 'react'
import SelectField from '../SelectField'
import SelectFieldDefault from '../SelectFieldDefault'
import { powerSourceList } from '../../../constants/constants'
import { Layout } from '@ui-kitten/components'
import { androidStyle } from '../../../styles/GlobalStyle'
import { View, StyleSheet } from 'react-native'

const RectifierView = () => {
    return (
        <>
            <Layout style={androidStyle.ConnectionCardMain}>
                <View style={styles.mainView}>
                    <SelectField
                        property='name'
                        label='Name' />
                    <View style={styles.location}>
                        <SelectField
                            style={styles.locationField}
                            placeholder='XX.XXXXXX'
                            property='latitude'
                            label='Latitude' />
                        <SelectField
                            style={styles.locationField}
                            placeholder='XX.XXXXXX'
                            property='longitude'
                            label='Longitude' />
                    </View>
                    <SelectField
                        label='Location'
                        placeholder='Location'
                        property='location' />
                    <View style={styles.location}>
                        <SelectField
                            style={styles.locationField}
                            property='maxCurrent'
                            placeholder='Amps'
                            label='DC Amps' />
                        <SelectField
                            style={styles.locationField}
                            property='maxVoltage'
                            placeholder='Volts'
                            label='DC Volts' />
                    </View>
                    <SelectField
                        placeholder='Model'
                        property='model'
                        label='Model' />
                    <SelectField
                    placeholder='Serial'
                        property='serialNumber'
                        label='Serial number' />
                    <SelectFieldDefault
                        label='Power source'
                        property='powerSource'
                        itemsList={powerSourceList}
                        placeholder='Select Source' />
                    <SelectField
                    placeholder='Comments'
                        label='Comments'
                        property='comment' />
                </View>
            </Layout>
        </>
    )
}

export default RectifierView

const styles = StyleSheet.create({
    mainView: {
        padding: 12
    },
    location: {
        flexDirection: 'row',
        marginHorizontal: -6,
        paddingBottom: 12
    },
    locationField: {
        flex: 1,
        marginHorizontal: 6
    }
})