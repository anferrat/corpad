import { Icon, ListItem } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet } from 'react-native'
import { success, warning, danger, basic } from '../../../../styles/colors'

const statusColors = [success, warning, danger, basic]

const renderIcon = (markerType, status) => (props) => <Icon name={`map-${markerType}`} pack='cp' {...props} fill={statusColors[status]} />

const diagArrowIcon = (props) => <Icon name='diagonal-arrow-right-up-outline' {...props} />

const SearchItem = ({ name, location, markerType, status, showOnMap }) => {
    return (
        <ListItem
            onPress={showOnMap}
            accessoryLeft={renderIcon(markerType, status)}
            accessoryRight={diagArrowIcon}
            title={name}
            description={location}
            style={styles.mainView} />
    )
}

export default React.memo(SearchItem)

const styles = StyleSheet.create({
    mainView: {
        heigth: 50,
        flex: 1
    }
})