import React from 'react'
import { StyleSheet, View } from 'react-native'
import SortingHeaderButton from './SortingHeaderButton'
import ReadingsHeaderButton from './ReadingsHeaderButton'
import FilterHeaderButton from './FilterHeaderButton'
import { basic300 } from '../../../../styles/colors'
import { useBottomSheetNavigation } from '../../../../hooks/bottom_sheet/useBottomSheetNavigation'
import { Button } from '@ui-kitten/components'

const ListHeader = (props) => {
    const { openRectifierReadingMenu, openTestPointFilterMenu, openTestPointReadingMenu, openTestPointSortingMenu } = useBottomSheetNavigation()
    if (props.dataType !== 'PIPELINE')
        return (
            <>
                <View style={styles.mainView}>
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
                </View>
            </>
        )
    else return <View style={styles.empty} />
}

export default ListHeader

const styles = StyleSheet.create({
    empty: {
        height: 10,
        elevation: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: basic300,
    },
    mainView: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        elevation: 5,
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
    },
})