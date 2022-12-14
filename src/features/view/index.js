import React, { useContext, useEffect } from 'react'
import { Animated, StyleSheet } from 'react-native'
import ActionButton from '../../components/ActionButton'
import { diagBack } from '../../components/Icons'
import LoaderItem from './LoaderItem'
import LoaderSubitemList from './LoaderSubitemList'
import { ScrollRef } from '../../../App'


const ViewItem = ({ itemId, dataTypeItem, navigateToEdit, navigateToEditSubitem, navigateToMap, goBack }) => {
    const scrollingRef = useContext(ScrollRef)

    useEffect(() => () => scrollingRef.current.setValue(0), [])

    return (
        <>
            <Animated.ScrollView
                contentContainerStyle={styles.scrollView}
                onScroll={Animated.event(
                    [{
                        nativeEvent: {
                            contentOffset: {
                                y: scrollingRef.current,
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
            </Animated.ScrollView>
            <ActionButton
                icon={diagBack}
                title='Back'
                onPress={goBack}
                valid={true} />
        </>
    )
}

export default ViewItem

const styles = StyleSheet.create({
    scrollView: {
        paddingBottom: 72
    }
})