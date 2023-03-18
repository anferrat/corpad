import React from 'react'
import { View, StyleSheet } from 'react-native'
import StatusIcon from '../StatusIcon'
import IconLine from '../IconLine'
import { getFullDate } from '../../../../helpers/functions'
import ItemTitleView from '../ItemTitleView'
import { combineLatLon } from '../../helpers/functions'

const TP = ({ data, itemType, updateStatus }) => {
    const { name, testPointType, status, timeModified, latitude, longitude, location, comment } = data

    const displayedTime = React.useMemo(() => getFullDate(timeModified), [timeModified])

    const displayedCoord = React.useMemo(() => combineLatLon(latitude, longitude), [latitude, longitude])

    return (
        <View style={styles.mainView}>
            <View style={styles.titleView}>
                <ItemTitleView
                    title={name}
                    itemType={itemType}
                    testPointType={testPointType} />
                <StatusIcon
                    status={status}
                    updateStatus={updateStatus} />
            </View>
            <IconLine icon='calendar-outline' value={displayedTime} />
            <IconLine icon='pin-outline' value={displayedCoord} />
            <IconLine icon='map-outline' value={location} />
            <IconLine icon='message-square-outline' value={comment} />
        </View>
    )
}
export default React.memo(TP)

const styles = StyleSheet.create({
    mainView: {
        flex: 1
    },
    titleView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    }
})