import React from 'react'
import { globalStyle } from '../../styles/styles'
import { SafeAreaView, ScrollView } from 'react-native'
import { Layout } from '@ui-kitten/components'
import TopBar from '../../features/edit/TopBar'
import LoaderSubItem from '../../features/edit/subitem/LoaderSubitem'
import SaveButton from '../../features/edit/subitem/SaveButton'
import OnboardingOverlay from '../../features/overlays/onboarding/OnboardingOverlay'

const EditSubitem = ({ route, navigation }) => {
    const { subitemId, itemId, isNew, subitemType, dataTypeItem, dataTypeSubitem } = route.params
    const goBack = () => navigation.goBack()
    return (
        <SafeAreaView style={globalStyle.screen}>
            {subitemType === 'BD' || subitemType === 'SH' || subitemType === 'IK' || subitemType === 'RE' ? <OnboardingOverlay onboarding={subitemType === 'RE' ? 'editReferenceCell' : 'editBond'} icon={subitemType === 'RE' ? 'onboarding-info' : 'onboarding-settings'} pack={'cp'} /> : null}
            <TopBar
                dataType={dataTypeSubitem}
                dataTypeItem={dataTypeItem}
                itemId={itemId}
                subitemId={subitemId}
                navigateAfterDelete={goBack}
                goBack={goBack} />
            <ScrollView>
                <Layout style={globalStyle.card}>
                    <LoaderSubItem
                        dataType={dataTypeSubitem}
                        dataTypeItem={dataTypeItem}
                        subitemType={subitemType}
                        isNew={isNew}
                        goBack={goBack}
                        itemId={itemId}
                        subitemId={subitemId} />
                </Layout>
                <Layout style={{ height: 64, backgroundColor: 'rgba(0, 0, 0, 0.0)' }}></Layout>
            </ScrollView>
            <SaveButton />
        </SafeAreaView >
    )
}

export default EditSubitem