import React from 'react'
import { globalStyle } from '../../styles/styles'
import { ScrollView, View } from 'react-native'
import { Layout } from '@ui-kitten/components'
import TopBar from '../../features/edit/TopBar'
import LoaderItem from '../../features/edit/item/LoaderItem'
import LoaderSubitemList from '../../features/edit/item/LoaderISubitemList'
import SaveButton from '../../features/edit/item/SaveButton'
import { getSubitemNameFromDataType, getListNameFromDataType } from '../../helpers/functions'
import OnboardingOverlay from '../../features/overlays/onboarding/OnboardingOverlay'




const EditItem = ({ route, navigation }) => {
    const { itemId, isNew, dataTypeItem } = route.params
    const submit = () => isNew ? navigation.navigate('ViewItem', { itemId: itemId, dataTypeItem: dataTypeItem }) : navigation.goBack()
    const goBack = () => navigation.goBack()
    const navigateToSubitem = (subitemId, isNew, subitemType) => navigation.navigate('EditSubitem', { subitemId: subitemId, itemId: itemId, subitemType: subitemType, isNew: isNew, dataTypeSubitem: getSubitemNameFromDataType(dataTypeItem), dataTypeItem: dataTypeItem })
    const navigateToList = () => navigation.navigate(getListNameFromDataType(dataTypeItem))

    return (
        <>
            {dataTypeItem === 'TEST_POINT' ? <OnboardingOverlay onboarding='editTestPoint' icon='onboarding-comment' pack='cp' /> : null}
            <View style={globalStyle.screen}>
                <TopBar
                    navigateAfterDelete={navigateToList}
                    dataType={dataTypeItem}
                    itemId={itemId}
                    goBack={goBack}>
                </TopBar>
                <ScrollView>
                    <LoaderItem
                        itemId={itemId}
                        isNew={isNew}
                        dataType={dataTypeItem}
                        navigateToView={submit}
                        navigateToSubitem={navigateToSubitem}
                        goBack={goBack} />
                    <LoaderSubitemList
                        itemId={itemId}
                        goBack={goBack}
                        dataType={dataTypeItem}
                        dataTypeSubitem={getSubitemNameFromDataType(dataTypeItem)}
                        navigateToSubitem={navigateToSubitem} />
                    <Layout style={{ height: 64, backgroundColor: 'rgba(0, 0, 0, 0)' }}></Layout>
                </ScrollView>
                <SaveButton />
            </View>
        </>
    )
}

export default EditItem