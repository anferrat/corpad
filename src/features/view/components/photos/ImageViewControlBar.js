import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ImageControlButton from '../../../../components/ImageControlButton'
import { translateView } from '../../../../localization'


const ImageViewControlBar = ({ onDeletePhoto, onSharePhoto, onSavePhoto }) => {
    const insets = useSafeAreaInsets()
    const isAndroid = Platform.OS === "android"
    return (
        <View style={{ ...styles.container, bottom: insets.bottom }}>
            <ImageControlButton
                icon={isAndroid ? 'share' : 'share-ios'}
                pack={isAndroid ? null : 'cp'}
                onPress={onSharePhoto}
                title={translateView('share')} />
            {isAndroid ? <ImageControlButton
                icon={'download'}
                onPress={onSavePhoto}
                title={translateView('save')} /> : null}
            <ImageControlButton
                icon={'trash'}
                onPress={onDeletePhoto}
                title={translateView('delete')} />
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
