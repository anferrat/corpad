import React from 'react'
import { View, StyleSheet } from 'react-native'
import ListItem from './components/ListItem'
import useImagePicker from './hooks/useImagePicker'


const ImagePickerView = ({ params, closeSheet }) => {
    const { addPhotoFromLibrary, addPhotoFromCamera, addPhotoFromStorage } = useImagePicker(params, closeSheet)
    return (
        <View style={styles.container}>
            <ListItem
                onPress={addPhotoFromCamera}
                title='Take a photo'
                icon='camera' />
            <ListItem
                onPress={addPhotoFromLibrary}
                title='Select from the gallery'
                icon='image' />
            <ListItem
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