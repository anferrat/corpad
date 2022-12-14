import React from 'react'
import { globalStyle } from '../../styles/styles'
import { SafeAreaView } from 'react-native'
import { getSubitemNameFromDataType } from '../../helpers/functions'
import { EditItem } from '../../features/edit/item'


const EditItemScreen = ({ route, navigation }) => {
    const { itemId, isNew, dataTypeItem } = route.params
    const submit = () => isNew ? navigation.navigate('ViewItem', { itemId: itemId, dataTypeItem: dataTypeItem }) : navigation.goBack()
    const goBack = () => navigation.goBack()
    const navigateToSubitem = (subitemId, isNew, subitemType) => navigation.navigate('EditSubitem', { subitemId: subitemId, itemId: itemId, subitemType: subitemType, isNew: isNew, dataTypeSubitem: getSubitemNameFromDataType(dataTypeItem), dataTypeItem: dataTypeItem })
    return (
        <SafeAreaView style={globalStyle.screen}>
            <EditItem
                submit={submit}
                goBack={goBack}
                navigateToSubitem={navigateToSubitem}
                itemId={itemId}
                isNew={isNew}
                dataTypeItem={dataTypeItem} />
        </SafeAreaView>
    )
}

export default EditItemScreen