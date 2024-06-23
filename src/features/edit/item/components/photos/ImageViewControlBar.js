import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ImageControlButton from '../../../../../components/ImageControlButton'


const ImageViewControlBar = ({ onDeletePhoto }) => {
    const insets = useSafeAreaInsets()
    return (
        <View style={{ ...styles.container, bottom: insets.bottom }}>
            <ImageControlButton
                icon={'trash'}
                onPress={onDeletePhoto}
                title={'Delete'} />
        </View>
    )
}

export default ImageViewControlBar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',

    },
})