import React from 'react'
import { globalStyle } from '../../styles/styles'
import { SafeAreaView } from 'react-native'
import { EditItem } from '../../features/edit/item'
import { OnboradingOverlayEditTestPoint } from '../../features/overlays/onboarding'


const EditItemScreen = ({ route, navigation }) => {
    const { itemId, isNew, itemType } = route.params
    const submit = () => isNew ? navigation.navigate('ViewItem', { itemId: itemId, itemType: itemType }) : navigation.goBack()
    const goBack = () => navigation.goBack()
    const navigateToSubitem = (subitemId, isNew, subitemType) => navigation.navigate('EditSubitem', { subitemId: subitemId, itemId: itemId, subitemType: subitemType, isNew: isNew })
    return (
        <SafeAreaView style={globalStyle.screen}>
            <OnboradingOverlayEditTestPoint
                visible={itemType === 'TEST_POINT'} />
            <EditItem
                submit={submit}
                goBack={goBack}
                navigateToSubitem={navigateToSubitem}
                itemId={itemId}
                isNew={isNew}
                itemType={itemType} />
        </SafeAreaView>
    )
}

export default EditItemScreen