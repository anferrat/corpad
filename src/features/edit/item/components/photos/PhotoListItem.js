import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { basic400 } from '../../../../../styles/colors'
import Pressable from '../../../../../components/Pressable'
import { androidRipple } from '../../../../../styles/styles'
import { dimensions } from './size'


const PhotoListItem = ({ uri, index, onPress }) => {

    const onPressHandler = React.useCallback(() => {
        onPress(index)
    }, [onPress, index])

    return (
        <Pressable
            onPress={onPressHandler}
            android_ripple={androidRipple}>
            <Image
                style={styles.image}
                width={dimensions.length}
                height={dimensions.length}
                source={{ uri }} />
        </Pressable>
    )
}

export default PhotoListItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: basic400,
        marginRight: dimensions.separator
    }
})