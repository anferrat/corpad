import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import { basic, basic200 } from '../../../../styles/colors'
import { translateSettings } from '../../../../localization'


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
                 {translateSettings('noFiles')}
            </Text>
            <Text
                category='p1'
                appearance={'hint'}
                style={styles.title}>
                 {translateSettings('noFilesDescription')}
            </Text>
        </View>
    )
}

export default React.memo(EmptyExportedFilesList)

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
