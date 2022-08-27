import React, { useRef, useEffect } from 'react'
import { androidStyle } from '../styles/GlobalStyle'
import { CommonActions } from '@react-navigation/native'
import { SafeAreaView, Animated, InteractionManager } from 'react-native'
import { Layout } from '@ui-kitten/components'
import MainActionButton from '../components/_Stateless/MainActionButton'
import { diagBack } from '../components/_Stateless/Icons'
import TopBar from '../components/View/TopBar'
import LoaderItem from '../components/View/LoaderItem'
import LoaderSubitemList from '../components/View/LoaderSubitemList'
import { getSubitemNameFromDataType, screenHandlerItem } from '../components/customFunctions'


const ViewItemScreen = ({ navigation, route }) => {
    const { itemId, dataTypeItem } = route.params
    const scrolling = useRef(new Animated.Value(0))

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
        <SafeAreaView style={androidStyle.AndroidSafeArea}>
            <TopBar
                dataType={dataTypeItem}
                ref={scrolling}
                itemId={itemId}
                goBack={goBack} />
            <Animated.ScrollView
                onScroll={Animated.event(
                    [{
                        nativeEvent: {
                            contentOffset: {
                                y: scrolling.current,
                            },
                        },
                    }],
                    { useNativeDriver: true }
                )}>
                <LoaderItem
                    dataType={dataTypeItem}
                    itemId={itemId}
                    navigateToMap={navigateToMap}
                    navigateToEditItem={navigateToEdit}
                    navigateToEditSubitem={navigateToEditSubitem}
                    goBack={goBack} />
                <LoaderSubitemList
                    dataTypeItem={dataTypeItem}
                    navigateToEditSubitem={navigateToEditSubitem}
                    itemId={itemId} />
                <Layout style={{ height: 64, backgroundColor: 'rgba(0, 0, 0, 0)' }}></Layout>
            </Animated.ScrollView>
            <MainActionButton
                icon={diagBack}
                title='Back'
                onPress={goBack}
                valid={true} />
        </SafeAreaView>
    )
}

export default ViewItemScreen