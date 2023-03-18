import React, { useContext, useEffect } from 'react'
import { Animated, StyleSheet } from 'react-native'
import ActionButton from '../../components/ActionButton'
import { diagBack } from '../../components/Icons'
import { ScrollRef } from '../../../App'
import ItemView from './ItemView'
import SubitemListView from './SubitemListView'


const ViewItem = ({ itemId, itemType, navigateToEdit, navigateToEditSubitem, navigateToMap, goBack }) => {
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
                <ItemView
                    itemType={itemType}
                    itemId={itemId}
                    navigateToEdit={navigateToEdit}
                    navigateToEditSubitem={navigateToEditSubitem}
                    navigateToMap={navigateToMap} />
                <SubitemListView
                    itemId={itemId}
                    itemType={itemType}
                    navigateToEditSubitem={navigateToEditSubitem} />
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