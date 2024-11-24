import React from 'react'
import { View, StyleSheet } from 'react-native'
import MenuListItem from '../components/MenuListItem'
import useImagePicker from './hooks/useImagePicker'


const ImagePickerView = ({ params, closeSheet }) => {
    const { addPhotoFromLibrary, addPhotoFromCamera, addPhotoFromStorage } = useImagePicker(params, closeSheet)
    return (
        <View style={styles.container}>
            <MenuListItem
                onPress={addPhotoFromCamera}
                title='Take a photo'
                icon='camera' />
            <MenuListItem
                onPress={addPhotoFromLibrary}
                title='Select from the gallery'
                icon='image' />
            <MenuListItem
                onPress={addPhotoFromStorage}
                title='Select from storage'
                icon='folder' />
        </View>
    )
}

export default ImagePickerView

const styles = StyleSheet.create({
    container: {
    },
})