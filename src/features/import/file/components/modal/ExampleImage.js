import { Icon, Text } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, Image, useWindowDimensions, View } from 'react-native'
import { danger, success } from '../../../../../styles/colors'


const ExampleImage = ({ image, isSuccess }) => {
    const { width } = useWindowDimensions()
    return (
        <View
            style={styles.container}>
            <Icon
                style={styles.icon}
                fill={isSuccess ? success : danger}
                name={isSuccess ? 'checkmark-circle-2' : 'close-circle'} />
            <Image
                style={{
                    width: width > 412 ? 400 : width - 46,
                    height: width > 412 ? 200 : (width - 46) / 2,
                    borderWidth: 3,
                    borderColor: isSuccess ? success : danger
                }}
                source={image} />


        </View>
    )
}

export default ExampleImage

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12
    },
    text: {
        fontWeight: 'bold',

    },
    icon: {
        width: 40,
        height: 40,
        marginBottom: 12
    }
})