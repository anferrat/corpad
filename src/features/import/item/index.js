import React, { createContext } from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ActionButton from '../../../components/ActionButton'
import { useSelector } from 'react-redux'
import ItemView from './item/Item'
import FileData from './item/FileData'
import SubitemView from './subitem/Subitem'
import { getSubitemIndex } from './helpers/functions'
import { diagBack, importIcon } from '../../../components/Icons'

export const ImportData = createContext()

export const ImportItem = ({ navigateToSpreadsheet, navigateToList, navigateToParameters, subitemIndex, pushToSubitem, isNewSubitem, goBack }) => {
    const fields = useSelector(state => state.importData.fields)
    const data = useSelector(state => state.importData.data)
    const extraData = useSelector(state => state.importData.extraData)
    const subIndex = useSelector(state => getSubitemIndex(state, subitemIndex, isNewSubitem)) //calculates index in case of a new subitem
    const isItem = subitemIndex === null && !isNewSubitem
    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <ImportData.Provider value={{
                    subitemIndex: subIndex,
                    fields: fields, //array of headers of csv files (alsop property names for data object)
                    navigateToParameters: navigateToParameters,
                    data: data, //values from csv file array of object with filed names as properties
                    extraData: extraData // pipelineList, referenceCellList and etc. for subitems
                }}>
                    {isItem ?
                        <>
                            <FileData
                                navigateToSpreadsheet={navigateToSpreadsheet} />
                            <ItemView
                                pushToSubitem={pushToSubitem} />
                        </> :
                        <SubitemView
                            subitemIndex={subIndex} />
                    }
                </ImportData.Provider>
            </ScrollView>
            <ActionButton
                icon={isItem ? importIcon : diagBack}
                title={isItem ? 'Import' : 'Back'}
                onPress={isItem ? () => { } : goBack}
                valid={true}
            />
        </>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        paddingBottom: 72
    }
})