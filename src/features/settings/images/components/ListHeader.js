import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { globalStyle } from '../../../../styles/styles'
import TextLine from '../../../../components/TextLine'
import { ImageListHeaderContext } from '../contexts/ImageListHeaderContext'
import { getFileSize } from '../../../../helpers/functions'

const ListHeader = ({ }) => {
    const { numberOfImages, totalSize, surveyName } = useContext(ImageListHeaderContext)
    const { value, unit } = getFileSize(totalSize)
    return (
        <View
            style={styles.container}>
            <TextLine
                value={surveyName}
                title={'Survey name'} />
            <TextLine
                value={numberOfImages}
                title={'Number of images'} />
            <TextLine
                value={value}
                title={'Size on disk'}
                unit={unit} />
        </View>
    )
}


export default ListHeader

const styles = StyleSheet.create({
    container: {
        ...globalStyle.card_noPadding,
        marginHorizontal: 6,
        marginBottom: 12
    },
    listItem: {
        height: 50
    },
    header: {
        paddingHorizontal: 12,
        marginTop: 6,
        marginBottom: 6
    }
})