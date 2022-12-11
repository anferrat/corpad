import React from 'react'
import { View } from 'react-native'
import { globalStyle } from '../../styles/styles'
import ImportParameters from '../../features/import/parameters/Parameters'


export default ImportParametersScreen = ({ route, navigation }) => {
    const goBack = () => {
        navigation.goBack()
    }
    const { property, subitemIndex } = route.params
    return (
        <View style={globalStyle.screen}>
            <ImportParameters
                property={property}
                subitemIndex={subitemIndex}
                goBack={goBack}
            />
        </View>
    )
}