import React from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import SortingHeaderButton from './components/SortingHeaderButton'
import ReadingsHeaderButton from './components/ReadingsHeaderButton'
import FilterHeaderButton from './components/FilterHeaderButton'
import { basic300 } from '../../../styles/colors'
import { useBottomSheetNavigation } from '../../../hooks/bottom_sheet/useBottomSheetNavigation'
import { ItemTypes } from '../../../constants/global'


const ListHeader = ({ itemType, translateY, opacity }) => {
    const { openRectifierReadingMenu, openTestPointFilterMenu, openTestPointReadingMenu, openTestPointSortingMenu, openRectifierSortingMenu } = useBottomSheetNavigation()
    if (itemType !== ItemTypes.PIPELINE)
        return (
            <Animated.View
                style={{
                    ...styles.mainView,
                    opacity: opacity,
                    transform: [{ translateY: translateY }]
                }}>
                <View style={styles.sorting}>
                    <SortingHeaderButton
                        itemType={itemType}
                        openSheet={itemType === ItemTypes.RECTIFIER ? openRectifierSortingMenu : openTestPointSortingMenu} />
                </View>
                <View style={styles.filter}>
                    <FilterHeaderButton
                        itemType={itemType}
                        openSheet={openTestPointFilterMenu} />
                </View>
                <View style={styles.reading}>
                    <ReadingsHeaderButton
                        itemType={itemType}
                        openSheet={
                            itemType === ItemTypes.RECTIFIER ?
                                openRectifierReadingMenu :
                                openTestPointReadingMenu} />
                </View>
            </Animated.View>
        )
    else return <View style={styles.mainView}></View>
}

export default ListHeader

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        elevation: 5,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        borderBottomWidth: 1,
        borderBottomColor: basic300
    },
    sorting: {
        justifyContent: 'center',
        height: 40,
        flex: 1.1,
    },
    filter: {
        justifyContent: 'center',
        height: 40,
        flex: 1.1,
    },
    reading: {
        justifyContent: 'center',
        height: 40,
        flex: 1.8,
    }
})