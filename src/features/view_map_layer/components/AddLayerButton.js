import { Button } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet } from 'react-native'
import { plus } from '../../../components/Icons'


const AddLayerButton = ({ onPress, inactive }) => {
    return (
        <Button
            disabled={inactive}
            accessoryLeft={inactive ? null : plus}
            style={styles.button}
            onPress={onPress}
            appearance='ghost'>
            {!inactive ? 'Add a map layer (.kml, .gpx)' : 'Max. limit reached'}
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