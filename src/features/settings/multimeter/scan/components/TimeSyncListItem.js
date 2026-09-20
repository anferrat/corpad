import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { Text, ListItem, Icon, Button } from '@ui-kitten/components'
import { useTimeSync } from '../hooks/useTimeSync'
import { primary, success, warning } from '../../../../../styles/colors'
import { TimeSyncSourceLabels } from '../../../../../constants/labels'
import { translateMultimeterSettings } from '../../../../../localization'

const warningIcon = (props) => <Icon {...props} name='alert-triangle' fill={warning} />

const successIcon = (props) => <Icon {...props} name='checkmark-circle-2' fill={success} />

const syncIcon = (props) => <Icon {...props} name='sync' fill={primary} />

const loadingIcon = (props) => <ActivityIndicator {...props} size='small' color={primary} />

const TimeSyncListItem = () => {
    const { isVisible, isTimeSynced, delta, timestamp, isLoading, source, onSyncPress } = useTimeSync()

    const renderSyncButton = (props) => {
        return <Button
            {...props}
            appearance='ghost'
            accessoryLeft={syncIcon}
            onPress={isLoading ? null : onSyncPress}>
        </Button>
    }
    if (isVisible)
        return (
            <ListItem
                style={styles.listItem}
                disabled={isLoading}
                accessoryLeft={isLoading ? loadingIcon : (isTimeSynced ? successIcon : warningIcon)}
                onPress={onSyncPress}
                 title={translateMultimeterSettings('timeSynchronization')}
                 description={isLoading ? translateMultimeterSettings('syncing') : (isTimeSynced ? translateMultimeterSettings('synced', { source: TimeSyncSourceLabels[source], delta }) : translateMultimeterSettings('notSynced'))}
                accessoryRight={renderSyncButton}
            />
        )
    else return null
}


export default TimeSyncListItem

const styles = StyleSheet.create({
    listItem: {
        marginHorizontal: -12,
        height: 60,
    },
})
