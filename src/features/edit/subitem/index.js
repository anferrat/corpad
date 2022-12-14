import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import LoaderSubItem from './LoaderSubitem'
import SaveButton from './SaveButton'
import { globalStyle } from '../../../styles/styles'

export const EditSubitem = ({ subitemId, itemId, isNew, subitemType, dataTypeItem, dataTypeSubitem, goBack }) => {
    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={globalStyle.card}>
                    <LoaderSubItem
                        dataType={dataTypeSubitem}
                        dataTypeItem={dataTypeItem}
                        subitemType={subitemType}
                        isNew={isNew}
                        goBack={goBack}
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