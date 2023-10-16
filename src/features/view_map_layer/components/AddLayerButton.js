import { Button } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet } from 'react-native'
import { plus } from '../../../components/Icons'


const AddLayerButton = ({ onPress }) => {
    return (
        <Button
            accessoryLeft={plus}
            style={styles.button}
            onPress={onPress}
            appearance='ghost'>
            Add a map layer (.kml, .gpx)
        </Button>
    )
}

export default AddLayerButton

const styles = StyleSheet.create({
    button: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
})