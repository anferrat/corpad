import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import useEditMapLayer from './hooks/useEditMapLayer'
import { globalStyle } from '../../styles/styles'
import BottomButton from '../../components/BottomButton'
import Input from '../../components/Input'
import Select from '../../components/Select'
import LoadingView from '../../components/LoadingView'
import GeoFileImportView from './components/GeoFileImportView'


const EditMapLayer = ({ isNew, layerId }) => {
    const {
        data,
        valid,
        geoFile,
        loading,
        colorList,
        widthList,
        onChangeName,
        onChangeComment,
        onEndEditingName,
        onEndEditingComment,
        onSelectColor,
        onSelectWidth,
        onSave,
        onSelectFile
    } = useEditMapLayer({ isNew, layerId })
    const { name, comment, colorIndex, widthIndex, defaultName } = data
    return (
        <LoadingView
            loading={loading}>
            <ScrollView
                style={styles.container}>
                {isNew ?
                    <View
                        style={styles.card}>
                        <GeoFileImportView
                            filename={geoFile.filename}
                            size={geoFile.size}
                            onSelectFile={onSelectFile}
                        />
                    </View> : null}
                <View
                    style={styles.card}>
                    <Input
                        placeholder={defaultName}
                        valid={valid.name}
                        maxLength={40}
                        label='Layer name'
                        value={name}
                        onChangeText={onChangeName}
                        onEndEditing={onEndEditingName} />
                    <Select
                        style={styles.select}
                        label={'Color'}
                        itemList={colorList}
                        selectedIndex={colorIndex}
                        onSelect={onSelectColor} />
                    <Select
                        style={styles.select}
                        label={'Stroke width'}
                        itemList={widthList}
                        selectedIndex={widthIndex}
                        onSelect={onSelectWidth} />
                    <Input
                        onChangeText={onChangeComment}
                        onEndEditing={onEndEditingComment}
                        maxLength={300}
                        multiline={true}
                        valid={valid.comment}
                        textAlignVertical={'top'}
                        numberOfLines={3}
                        label='Comments'
                        value={comment}
                        placeholder='Type your comments here' />
                </View>
            </ScrollView >
            <BottomButton
                title={isNew ? 'Create' : 'Save'}
                onPress={onSave}
                icon={'save'}
            />
        </LoadingView>
    )
}

export default EditMapLayer

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    card: {
        ...globalStyle.card,
    },
    select: {
        paddingBottom: 12
    }
})