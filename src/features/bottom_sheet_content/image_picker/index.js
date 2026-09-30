import React from 'react'
import { View, StyleSheet } from 'react-native'
import MenuListItem from '../components/MenuListItem'
import useImagePicker from './hooks/useImagePicker'
import { translateBottomSheet } from '../../../localization'


const ImagePickerView = ({ params, closeSheet }) => {
    const { isBusy, addPhotoFromLibrary, addPhotoFromCamera, addPhotoFromStorage } = useImagePicker(params, closeSheet)
    return (
        <View style={styles.container}>
            <MenuListItem
                disabled={isBusy}
                onPress={addPhotoFromCamera}
                title={translateBottomSheet('takePhoto')}
                icon='camera' />
            <MenuListItem
                disabled={isBusy}
                onPress={addPhotoFromLibrary}
                title={translateBottomSheet('selectGallery')}
                icon='image' />
            <MenuListItem
                disabled={isBusy}
                onPress={addPhotoFromStorage}
                title={translateBottomSheet('selectStorage')}
                icon='folder' />
        </View>
    )
}

export default ImagePickerView

const styles = StyleSheet.create({
    container: {
    },
})
