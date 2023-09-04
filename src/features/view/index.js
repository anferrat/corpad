import React, { useContext, useEffect } from 'react'
import { Animated, StatusBar, StyleSheet } from 'react-native'
import BottomButton from '../../components/BottomButton'
import { diagBack } from '../../components/Icons'
import { ScrollRef } from '../../../App'
import ItemView from './ItemView'
import SubitemListView from './SubitemListView'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const AnimatedKeyboardAwareScrollView = Animated.createAnimatedComponent(KeyboardAwareScrollView)

const ViewItem = ({ itemId, itemType, navigateToEdit, navigateToEditSubitem, navigateToMap, goBack }) => {
    const scrollingRef = useContext(ScrollRef)

    useEffect(() => () => scrollingRef.current.setValue(0), [])

    return (
        <>
            <AnimatedKeyboardAwareScrollView
                enableOnAndroid={true}
                extraHeight={260}
                enableResetScrollToCoords={false}
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
            </AnimatedKeyboardAwareScrollView>
            <BottomButton
                icon='undo'
                title='Back'
                onPress={goBack} />
        </>
    )
}

export default ViewItem

const styles = StyleSheet.create({
    scrollView: {
        paddingBottom: 72,
    }
})