import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ImageControlButton from '../../../../components/ImageControlButton'
import GoToButton from './GoToButton'
import { ItemTypeIconsFilled } from '../../../../constants/icons'


const ImageViewControlBar = ({ onShare, onSave, itemType, goToItem, itemName, timeCreated }) => {
    const insets = useSafeAreaInsets()
    const isAndroid = Platform.OS === "android"

    const icon = itemType === null ? null : (ItemTypeIconsFilled[itemType] ?? null)
    return (
        <View style={{ ...styles.container, bottom: insets.bottom }}>
            <GoToButton
                timeCreated={timeCreated}
                name={itemName}
                onPress={goToItem}
                icon={icon}
                pack='cp' />
            <View style={styles.buttons}>
                <ImageControlButton
                    icon={isAndroid ? 'share' : 'share-ios'}
                    pack={isAndroid ? null : 'cp'}
                    onPress={onShare}
                    title={'Share'} />
                {isAndroid ? <ImageControlButton
                    icon={'download'}
                    onPress={onSave}
                    title={'Save'} /> : null}
                <ImageControlButton
                    icon={'diagonal-arrow-right-up'}
                    onPress={goToItem}
                    title={'Go to'} />
            </View>
        </View>
    )
}

export default ImageViewControlBar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        width: '100%',
    },
    buttons: {
        width: '100%',
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
    }
})