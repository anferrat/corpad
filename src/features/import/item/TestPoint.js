import React from 'react'
import { View, StyleSheet } from 'react-native'
import ImportItemInputField from '../form/InputField'
import { Icon } from '@ui-kitten/components'
import { basic } from '../../../styles/colors'
import { globalStyle } from '../../../styles/styles'
import { testPointTypeCodes } from '../../../constants/constants'


const TestPointView = () => {
    const accessoryList = React.useMemo(() => testPointTypeCodes.map(code =>
        <Icon pack='cp' name={code} fill={basic}
            style={styles.icon} />), [])
    return (
        <>
            <View style={globalStyle.card}>
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
            </View>
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

