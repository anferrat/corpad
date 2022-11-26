import React from 'react'
import SelectFieldDefault from '../SelectFieldDefault'
import SelectField from '../SelectField'
import ImportItemInputField from '../InputField'
import { Layout, Icon } from '@ui-kitten/components'
import { androidStyle, basic } from '../../../styles/GlobalStyle'
import { testPointTypeCodes, testPointTypes } from '../../../constants/constants'
import { View, StyleSheet } from 'react-native'



const TestPointView = () => {
    const accessoryList = React.useMemo(() => testPointTypeCodes.map(code =>
        <Icon pack='cp' name={code} fill={basic}
            style={styles.icon} />), [])
    return (
        <>
            <Layout style={androidStyle.ConnectionCardMain}>
                <View style={styles.mainView}>
                    <ImportItemInputField
                        property='name' />
                    <ImportItemInputField
                        property='status' />
                    <View style={styles.location}>
                        <ImportItemInputField
                            style={styles.locationField}
                            property='latitude' />
                        <ImportItemInputField
                            style={styles.locationField}
                            property='longitude' />
                    </View>
                    <ImportItemInputField
                        property='location' />
                    <ImportItemInputField
                        property='comment' />
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
    },
    locationField: {
        flex: 1,
        marginHorizontal: 6,
    }
})

