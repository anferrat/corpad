import React from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import SortingHeaderButton from './SortingHeaderButton'
import ReadingsHeaderButton from './ReadingsHeaderButton'
import FilterHeaderButton from './FilterHeaderButton'
import { basic300 } from '../../../../styles/colors'
import { useBottomSheetNavigation } from '../../../../hooks/bottom_sheet/useBottomSheetNavigation'


const ListHeader = (props) => {
    const { openRectifierReadingMenu, openTestPointFilterMenu, openTestPointReadingMenu, openTestPointSortingMenu } = useBottomSheetNavigation()
    const { translateY, opacity } = props

    return (
        <Animated.View
            style={{ ...styles.mainView, opacity: opacity, transform: [{ translateY: translateY }] }}>
            <View style={styles.sorting}>
                <SortingHeaderButton
                    dataType={props.dataType}
                    openSheet={openTestPointSortingMenu} />
            </View>
            <View style={styles.filter}>
                <FilterHeaderButton
                    dataType={props.dataType}
                    openSheet={openTestPointFilterMenu} />
            </View>
            <View style={styles.reading}>
                <ReadingsHeaderButton
                    dataType={props.dataType}
                    openSheet={props.dataType === 'RECTIFIER' ? openRectifierReadingMenu : openTestPointReadingMenu} />
            </View>
        </Animated.View>
    )
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