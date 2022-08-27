import React from 'react'
import { androidStyle } from '../styles/GlobalStyle'
import { SafeAreaView, ScrollView } from 'react-native'
import { Layout } from '@ui-kitten/components'
import TopBar from '../components/Edit/TopBar'
import LoaderSubItem from '../components/Edit/subitem/LoaderSubitem'
import SaveButton from '../components/Edit/subitem/SaveButton'
import OnboardingOverlay from '../components/Modals/Onboarding/OnboardingOverlay'

const EditSubitem = ({ route, navigation }) => {
    const { subitemId, itemId, isNew, subitemType, dataTypeItem, dataTypeSubitem } = route.params
    const goBack = () => navigation.goBack()
    return (
        <SafeAreaView style={androidStyle.AndroidSafeArea}>
            {subitemType === 'BD' || subitemType === 'SH' || subitemType === 'IK' || subitemType === 'RE' ? <OnboardingOverlay onboarding={subitemType === 'RE' ? 'editReferenceCell' : 'editBond'} icon={subitemType === 'RE' ? 'onboarding-info' : 'onboarding-settings'} pack={'cp'} /> : null}
            <TopBar
                dataType={dataTypeSubitem}
                dataTypeItem={dataTypeItem}
                itemId={itemId}
                subitemId={subitemId}
                navigateAfterDelete={goBack}
                goBack={goBack} />
            <ScrollView>
                <Layout style={androidStyle.ConnectionCard}>
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