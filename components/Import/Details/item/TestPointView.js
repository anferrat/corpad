import React from 'react'
import SelectFieldDefault from '../SelectFieldDefault'
import SelectField from '../SelectField'
import { Layout, Icon } from '@ui-kitten/components'
import { androidStyle, basic } from '../../../../styles/GlobalStyle'
import { testPointTypeCodes, testPointTypes } from '../../../../constants/constants'
import { View, StyleSheet } from 'react-native'



const TestPointView = () => {
    const accessoryList = React.useMemo(() => testPointTypeCodes.map(code =>
        <Icon pack='cp' name={code} fill={basic}
            style={styles.icon} />), [])
    return (
        <>
            <Layout style={androidStyle.ConnectionCardMain}>
                <View style={styles.mainView}>
                    <SelectField
                        property='name'
                        label='Name' />
                    <SelectFieldDefault
                        accessoryList={accessoryList}
                        ignorePlaceholder={true}
                        valid={true}
                        property='testPointType'
                        itemsList={testPointTypes}
                        label='Test point type' />
                    <View style={styles.location}>
                        <SelectField
                            placeholder='XX.XXXXXX'
                            style={styles.locationField}
                            property='latitude'
                            label='Latitude' />
                        <SelectField
                            style={styles.locationField}
                            placeholder='XX.XXXXXX'
                            property='longitude'
                            label='Longitude' />
                    </View>
                    <SelectField
                        placeholder='Location'
                        property='location'
                        label='Location' />
                    <SelectField
                        placeholder='Comments'
                        property='comment'
                        label='Comments' />
                </View>
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

