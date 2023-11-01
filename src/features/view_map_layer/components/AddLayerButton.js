import { Button } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet } from 'react-native'
import { plus, pricetags } from '../../../components/Icons'


const AddLayerButton = ({ onPress, inactive, isPro }) => {
    return (
        <Button
            disabled={inactive}
            accessoryLeft={isPro ? (inactive ? null : plus) : pricetags}
            style={styles.button}
            onPress={onPress}
            appearance='ghost'>
            {isPro ? (!inactive ? 'Add a map layer (.kml, .gpx)' : 'Max. limit reached') : 'Upgrade to premium'}
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