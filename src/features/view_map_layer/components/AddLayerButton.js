import { Button, Text } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { plus, pricetags } from '../../../components/Icons'


const AddLayerButton = ({ onPress, inactive, isPro }) => {
    return (
        <Button
            disabled={inactive}
            accessoryLeft={isPro ? (inactive ? null : plus) : pricetags}
            style={styles.button}
            onPress={onPress}
            appearance='ghost'>
            {isPro ? (!inactive ?
                <View>
                    <Text
                        style={styles.mainText}
                        category='p1'
                        status='primary'>
                        Add a map layer
                    </Text>
                    <Text appearance='hint' category='s2'>
                        Supported formats: .kml, .kmz, .gpx, .geojson
                    </Text>
                </View>
                : 'Max. limit reached') : 'Upgrade to premium'}
        </Button>
    )
}

export default AddLayerButton

const styles = StyleSheet.create({
    button: {
        height: 80,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    mainText: {
        fontWeight: 'bold',
    }
})