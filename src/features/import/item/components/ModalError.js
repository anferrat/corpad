import React from 'react'
import { Button, Text } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'

const ModalError = ({
    hideModal
}) => {
    return (
        <View style={styles.view}>
            <Text category='h6'>Error</Text>
            <Text style={styles.text}>No items to import. Data file is empty</Text>
            <Button appearance='ghost' onPress={hideModal}>Close</Button>
        </View>
    )
}

export default ModalError


const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'space-between',
    },
    text: {
        padding: 12
    }
})