import React from 'react'
import { View, StyleSheet } from 'react-native'
import ItemHeader from '../components/ItemHeader'
import IconLine from '../components/IconLine'

const TP = ({ name, itemType, coord, comment, location, status, testPointType, date }) => {

    return (
        <View style={styles.container}>
            <ItemHeader
                testPointType={testPointType}
                name={name}
                itemType={itemType} />
            <IconLine icon='calendar-outline' label={date} />
            <IconLine icon='pin-outline' label={coord} />
            <IconLine icon='map-outline' label={location} />
            <IconLine icon='message-square-outline' label={comment} />
        </View>
    )
}

export default React.memo(TP)

const styles = StyleSheet.create({
    container: {

    },
})