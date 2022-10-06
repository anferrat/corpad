import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import { basic, basic200 } from '../../../styles/GlobalStyle'


const EmptyExportedFilesList = () => {
    return (
        <View style={styles.mainView}>
            <Icon style={styles.icon} fill={basic} name={'code-download-outline'} />
            <Text category='h3' appearance={'hint'} style={styles.title}>Folder is empty</Text>
            <Text category='p1' appearance={'hint'} style={styles.title}>You can see your .csv and .kml files here after exporting data from survey.</Text>
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