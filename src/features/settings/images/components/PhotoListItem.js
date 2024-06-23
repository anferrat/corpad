import React from 'react'
import { StyleSheet, Image } from 'react-native'
import Pressable from '../../../../components/Pressable'
import { androidRipple } from '../../../../styles/styles'
import { imageLength } from '../constants/dimensions'


const PhotoListItem = ({ source, index, onPress }) => {
    const onPressHandler = React.useCallback(() => {
        onPress(index)
    }, [onPress, index])

    return (
        <Pressable
            android_ripple={androidRipple}
            onPress={onPressHandler}>
            <Image
            style={styles.image}
                width={imageLength}
                height={imageLength}
                source={source} />
        </Pressable>
    )
}

export default React.memo(PhotoListItem)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        marginRight: 6
    }
})