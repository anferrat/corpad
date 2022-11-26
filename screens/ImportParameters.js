import React from 'react'
import { androidStyle } from '../styles/GlobalStyle'
import { View } from 'react-native'
import TopBar from '../components/Import/TopBar'
import ItemView from '../components/Import/item/Item'
import ImportButton from '../components/Import/ImportButton'
import { ScrollView } from 'react-native-gesture-handler'
import InputFieldParamaters from '../components/Import/parameters/InputFieldParameters'
import ImportParameters from '../components/Import/parameters/ImportParameters'


export default ImportParametersScreen = ({ route, navigation }) => {
    const goBack = () => {
        navigation.goBack()
    }
    const { property, subitemIndex } = route.params

    return (
        <View style={androidStyle.AndroidSafeArea}>
            <ImportParameters
                property={property}
                subitemIndex={subitemIndex}
                goBack={goBack}
            />
        </View>
    )
}