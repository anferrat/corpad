import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { ListItem, Text } from '@ui-kitten/components'
import { globalStyle } from '../../../../styles/styles'
import TextLine from '../../../../components/TextLine'
import { hardDrive } from '../../../../components/Icons'
import { ImageListHeaderContext } from '../contexts/ImageListHeaderContext'
import { getFileSize } from '../../../../helpers/functions'


const ListHeader = ({ }) => {
    const { numberOfImages, totalSize, surveyName } = useContext(ImageListHeaderContext)
    const { value, unit } = getFileSize(totalSize)
    return (
        <View
            style={styles.container}>
            <View
                style={styles.header}>
                <Text
                    category='h6'>
                    Survey images
                </Text>
                <Text
                    category='s2'
                    appearance='hint'>
                    {surveyName}
                </Text>
            </View>
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