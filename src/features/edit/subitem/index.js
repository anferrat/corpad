import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import SubitemView from './SubitemView'
import SaveButton from './SaveButton'
import { globalStyle } from '../../../styles/styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export const EditSubitem = ({ itemId, subitemId, subitemType, isNew }) => {

    return (
        <>
            <KeyboardAwareScrollView
                keyboardOpeningTime={100}
                enableResetScrollToCoords={false}
                enableOnAndroid={true}
                extraHeight={100}
                enableAutomaticScroll={true}
                contentContainerStyle={styles.scrollView}>
                <View style={globalStyle.card}>
                    <SubitemView
                        subitemType={subitemType}
                        isNew={isNew}
                        itemId={itemId}
                        subitemId={subitemId} />
                </View>
            </KeyboardAwareScrollView>
            <SaveButton />
        </>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        paddingBottom: 72
    }
})