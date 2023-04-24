import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import { basic, basic200 } from '../../../../styles/colors'


const EmptyExportedFilesList = () => {
    return (
        <View
            style={styles.mainView}>
            <Icon
                style={styles.icon}
                fill={basic}
                name={'file-text-outline'} />
            <Text
                category='h4'
                appearance={'hint'}
                style={styles.title}>
                No files found
            </Text>
            <Text
                category='p1'
                appearance={'hint'}
                style={styles.title}>
                You can manage .csv and .kml files here, after exporting data from surveys.
            </Text>
        </View>
    )
}

export default React.memo(EmptyExportedFilesList, () => true)

const styles = StyleSheet.create({
    mainView: {
        ...StyleSheet.absoluteFill,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: basic200,
        padding: 12
    },
    title: {
        marginBottom: 20,
        marginTop: 10,
        textAlign: 'center'
    },
    icon: {
        width: 80,
        height: 80,
    }
})