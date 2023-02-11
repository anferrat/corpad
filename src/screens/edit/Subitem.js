import React from 'react'
import { globalStyle } from '../../styles/styles'
import { SafeAreaView } from 'react-native'
import { EditSubitem } from '../../features/edit/subitem'

const EditSubitemScreen = ({ route, navigation }) => {
    const { subitemId, itemId, isNew, subitemType, dataTypeItem, dataTypeSubitem } = route.params
    const goBack = () => navigation.goBack()
    console.log('sub', subitemId)
    return (
        <SafeAreaView style={globalStyle.screen}>
            <EditSubitem
                subitemId={subitemId}
                itemId={itemId}
                isNew={isNew}
                subitemType={subitemType}
                dataTypeItem={dataTypeItem}
                dataTypeSubitem={dataTypeSubitem}
                goBack={goBack}
            />
        </SafeAreaView >
    )
}

export default EditSubitemScreen