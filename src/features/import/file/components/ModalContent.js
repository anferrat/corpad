import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import Title from './Title'
import Header from '../../../../components/Header'
import { basic200 } from '../../../../styles/colors'
import { globalStyle } from '../../../../styles/styles'
import Text from './modal/Text'
import B from './modal/B'
import ExampleImage from './modal/ExampleImage'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { translateImport } from '../../../../localization'

const images = {
    yes: require('../assets/yes.png'),
    no: require('../assets/no.png')
}

const ModalContent = ({ hideModal }) => {
    return (
        <>
            <SafeAreaProvider>
                <Header
                    title={translateImport('file.preparationTitle')}
                    onBackPress={hideModal} />
                <ScrollView
                    style={styles.container}>
                    <View
                        style={globalStyle.card}>
                        <Title name={translateImport('file.preparation.spreadsheet')} />
                        <Text>{translateImport('file.preparation.ensureSize')} <B>3MB</B>.</Text>
                        <Text>{translateImport('file.preparation.eachRow')}</Text>
                        <Text>{translateImport('file.preparation.firstRow')} <B>{translateImport('file.preparation.headers')}</B> {translateImport('file.preparation.describeColumns')}</Text>
                        <Text>{translateImport('file.preparation.avoid')} <B>{translateImport('file.preparation.mergedCells')}</B> {translateImport('file.preparation.blankColumns')}</Text>
                        <Text>{translateImport('file.preparation.onlyFirst')} <B>{translateImport('file.preparation.firstSheet')}</B> {translateImport('file.preparation.imported')}</Text>
                        <ExampleImage
                            isSuccess={true}
                            image={images.yes} />
                        <ExampleImage
                            isSuccess={false}
                            image={images.no} />
                    </View>
                    <View
                        style={globalStyle.card}>
                        <Title name={translateImport('file.preparation.formatting')} />
                        <Text>{translateImport('file.preparation.specialCharacters')} <B>{translateImport('file.preparation.specialCharacterLabel')}</B> {translateImport('file.preparation.nameProperty')} <B>{translateImport('file.preparation.namePropertyLabel')}</B>. {translateImport('file.preparation.removed')}</Text>
                        <Text><B>{translateImport('file.preparation.numerical')}</B> {translateImport('file.preparation.noText')} "50mV" {translateImport('file.preparation.splitValue')} "50" {translateImport('file.preparation.oneColumn')} "mV" {translateImport('file.preparation.anotherColumn')}</Text>
                    </View>
                    <View
                        style={globalStyle.card}>
                        <Title name={translateImport('file.preparation.tips')} />
                        <Text>{translateImport('file.preparation.variousUnits')} <B>{translateImport('file.preparation.units')}</B> (e.g., "mV" instead of "V").</Text>
                        <Text>{translateImport('file.preparation.cancelRecent')} <B>{translateImport('file.preparation.importScreen')}</B> {translateImport('file.preparation.screen')}</Text>
                    </View>
                </ScrollView>
            </SafeAreaProvider>
        </>
    )
}

export default ModalContent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: basic200
    },
    text: {
        fontSize: 16,
        marginBottom: 6
    },
})
