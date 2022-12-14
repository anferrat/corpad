import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import LoaderItem from './LoaderItem'
import LoaderSubitemList from './LoaderSubitemList'
import SaveButton from './SaveButton'
import { getSubitemNameFromDataType } from '../../../helpers/functions'


export const EditItem = ({ itemId, isNew, dataTypeItem, navigateToSubitem, submit, goBack }) => {
    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollView}>
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