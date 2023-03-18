import React from 'react'
import { globalStyle } from '../../styles/styles'
import { SafeAreaView } from 'react-native'
import { EditSubitem } from '../../features/edit/subitem'

const EditSubitemScreen = ({ route }) => {
    const { subitemId, itemId, isNew, subitemType } = route.params

    return (
        <SafeAreaView style={globalStyle.screen}>
            <EditSubitem
                subitemId={subitemId}
                itemId={itemId}
                isNew={isNew}
                subitemType={subitemType} />
        </SafeAreaView >
    )
}

export default EditSubitemScreen