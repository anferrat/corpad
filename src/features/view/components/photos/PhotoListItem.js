import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { primary400 } from '../../../../styles/colors'
import Pressable from '../../../../components/Pressable'
import { androidRipple } from '../../../../styles/styles'
import { imageLength, separatorWidth } from './constants/dimensions'


const PhotoListItem = ({ source, index, onPress }) => {

    const onPressHandler = React.useCallback(() => {
        onPress(index)
    }, [onPress, index])

    return (
        <Pressable
            onPress={onPressHandler}>
            <Image
                style={styles.image}
                width={imageLength}
                height={imageLength}
                source={source} />
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
        borderWidth: 2,
        borderColor: primary400,
        marginRight: separatorWidth
    }
})