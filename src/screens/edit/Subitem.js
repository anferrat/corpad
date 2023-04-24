import React from 'react'
import { globalStyle } from '../../styles/styles'
import { SafeAreaView } from 'react-native'
import { EditSubitem } from '../../features/edit/subitem'
import { OnboardingOverlayEditReferenceCell, OnboardingOverlayEditSides } from '../../features/overlays/onboarding'

const EditSubitemScreen = ({ route }) => {
    const { subitemId, itemId, isNew, subitemType } = route.params

    return (
        <SafeAreaView style={globalStyle.screen}>
            <OnboardingOverlayEditSides
                visible={['BD', 'IK', 'SH'].some(type => type === subitemType)} />
            <OnboardingOverlayEditReferenceCell
                visible={subitemType === 'RE'} />
            <EditSubitem
                subitemId={subitemId}
                itemId={itemId}
                isNew={isNew}
                subitemType={subitemType} />
        </SafeAreaView >
    )
}

export default EditSubitemScreen