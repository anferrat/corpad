import { Icon, Text } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { basic } from '../../../styles/colors'


const EmptyMapLayerListComponent = () => {

    return <View
        style={styles.container}>
       
        <Text
            category='s2'
            appearance='hint'>
            No map layers found in this survey.
        </Text>
    </View>
}

export default EmptyMapLayerListComponent

const styles = StyleSheet.create({
    container: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20
    }
})