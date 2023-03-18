import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import SubitemView from './SubitemView'
import SaveButton from './SaveButton'
import { globalStyle } from '../../../styles/styles'

export const EditSubitem = ({ itemId, subitemId, subitemType, isNew }) => {

    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={globalStyle.card}>
                    <SubitemView
                        subitemType={subitemType}
                        isNew={isNew}
                        itemId={itemId}
                        subitemId={subitemId} />
                </View>
            </ScrollView>
            <SaveButton />
        </>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        paddingBottom: 72
    }
})