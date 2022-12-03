import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { BS } from '../../../../../App'
import SortingHeaderButton from './SortingHeaderButton'
import ReadingsHeaderButton from './ReadingsHeaderButton'
import FilterHeaderButton from './FilterHeaderButton'
import { updateSetting } from '../../../../store/actions/settings'
import { errorHandler } from '../../../../helpers/functions'
import { basic300 } from '../../../../styles/colors'

const ListHeader = (props) => {
    const bottomSheet = useContext(BS)
    const dispatch = useDispatch()

    const openSheetHandler = React.useCallback((content, index) => {
        if (bottomSheet.current.snapToIndex)
            bottomSheet.current.snapToIndex(index)
        else errorHandler(503)
        dispatch(updateSetting('bottomSheetContent', { itemType: props.dataType, content: content }))
    }, [props.dataType])

    if (props.dataType !== 'PIPELINE')
        return (
            <View style={styles.mainView}>
                <View style={styles.sorting}>
                    <SortingHeaderButton
                        dataType={props.dataType}
                        openSheet={openSheetHandler.bind(this, 'sorting', 4)} />
                </View>
                <View style={styles.filter}>
                    <FilterHeaderButton
                        dataType={props.dataType}
                        openSheet={openSheetHandler.bind(this, 'filter', 4)} />
                </View>
                <View style={styles.reading}>
                    <ReadingsHeaderButton
                        dataType={props.dataType}
                        openSheet={openSheetHandler.bind(this, 'readings', props.dataType === 'RECTIFIER' ? 1 : 4)} />
                </View>
            </View>
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