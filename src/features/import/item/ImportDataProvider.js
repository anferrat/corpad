import React, { createContext, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import ImportButton from './ImportButton'


export const ImportData = createContext()

export const ImportDataProvider = ({ navigateToList, navigateToParameters, subitemIndex, pushToSubitem, goBack, children, navigateToFile }) => {
    const providerData = useSelector(state => ({
        subitemIndex: subitemIndex,
        fields: state.importData.fields,
        navigateToParameters: navigateToParameters,
        pushToSubitem: pushToSubitem,
        data: state.importData.data,
        extraData: state.importData.extraData,
        goBack: goBack,
        navigateToList: navigateToList
    }))
    useEffect(() => {
        if (providerData.data.length === 0 && navigateToFile)
            navigateToFile()
    }, [])
    return (
        <ImportData.Provider value={providerData}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {children}
            </ScrollView>
            <ImportButton />
        </ImportData.Provider>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        paddingBottom: 72
    }
})