import React from 'react'
import { Modal, Text, Button, Icon } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import WarningElement from './WarningElement'

const WarningDisplay = (props) => {

    const renderWarningElement = ({ item }) => (
        <WarningElement
            row={item.row}
            failedProperties={item.failedProperties}
        />
    )
    if (props.warnings.length === 0)
        return null
    else
        return (
            <>
                <Text category={'p1'} status='warning'>Warnings for {props.warnings.length} rows</Text>
                <Text appearance={'hint'} category='s2'>Some values cannot be inserted due to invalid format. See details below:</Text>
                <FlatList
                    style={styles.list}
                    keyExtractor={(item) => item.row}
                    data={props.warnings}
                    renderItem={renderWarningElement}
                />
            </>
        )
}

export default WarningDisplay

const styles = StyleSheet.create({
    list: {
        marginTop: 12,
    }
})