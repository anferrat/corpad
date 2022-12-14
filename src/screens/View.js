import React, { useEffect } from 'react'
import { SafeAreaView, InteractionManager } from 'react-native'
import { globalStyle } from '../styles/styles'
import { CommonActions } from '@react-navigation/native'
import { getSubitemNameFromDataType, screenHandlerItem } from '../helpers/functions'
import ViewItem from '../features/view'

const ViewItemScreen = ({ navigation, route }) => {
    const { itemId, dataTypeItem } = route.params

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            navigation.dispatch(state => { // In case of new test point clears edit screens
                const routes = state.routes.filter(r => r.name !== 'EditItem' && r.name !== 'EditSubitem')
                return CommonActions.reset({
                    ...state,
                    routes,
                    index: routes.length - 1,
                })
            })
        })
    }, [])

    const navigateToEdit = () => navigation.navigate('EditItem', { itemId: itemId, isNew: false, dataTypeItem: dataTypeItem })

    const navigateToEditSubitem = (subitemId, isNew, subitemType) => navigation.navigate('EditSubitem', { isNew: isNew, itemId: itemId, subitemId: subitemId, subitemType: subitemType, dataTypeItem: dataTypeItem, dataTypeSubitem: getSubitemNameFromDataType(dataTypeItem) })

    const navigateToMap = () => navigation.navigate('Map')

    const goBack = () => navigation.goBack()

    // when working with map it's better to use go back, when working with lists goTo List. Maybe need to add the way to see where user navigated from (map or list) but in case of new item creates complication, so leave it for now
    //const goToList = () => navigation.navigate(screenHandlerItem(dataTypeItem))


    return (
        <SafeAreaView style={globalStyle.screen}>
            <ViewItem
                itemId={itemId}
                dataTypeItem={dataTypeItem}
                navigateToEdit={navigateToEdit}
                navigateToEditSubitem={navigateToEditSubitem}
                navigateToMap={navigateToMap}
                goBack={goBack} />
        </SafeAreaView>
    )
}

export default ViewItemScreen