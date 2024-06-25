import React, { useContext } from 'react'
import { StyleSheet, Image } from 'react-native'
import Pressable from '../../../../components/Pressable'
import { androidRipple } from '../../../../styles/styles'
import { imageLength, separatorWidth } from '../constants/dimensions'
import { PhotoItemContext } from '../contexts/PhotoItemContext'


const PhotoListItem = ({ source, index, }) => {
    const onPress = useContext(PhotoItemContext)
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
        marginRight: separatorWidth,
        marginBottom: separatorWidth
    }
})