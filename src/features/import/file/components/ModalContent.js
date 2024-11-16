import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import Title from './Title'
import Header from '../../../../components/Header'
import { basic200 } from '../../../../styles/colors'
import { globalStyle } from '../../../../styles/styles'
import Text from './modal/Text'
import B from './modal/B'
import ExampleImage from './modal/ExampleImage'

const images = {
    yes: require('../assets/yes.png'),
    no: require('../assets/no.png')
}

const ModalContent = ({ hideModal }) => {
    return (
        <>
            <Header
                title={'How to prepare your files'}
                onBackPress={hideModal}/>
            <ScrollView
                style={styles.container}>
                <View
                    style={globalStyle.card}>
                    <Title name='1. Preparing your spreadsheet for import' />
                    <Text>Ensure the spreadsheet file size is less than <B>3MB</B>.</Text>
                    <Text>Each row should represent a separate item.</Text>
                    <Text>The first row must contain <B>headers</B> that describe the data in each column.</Text>
                    <Text>Avoid using <B>merged cells, blank rows,</B> or <B>blank columns.</B></Text>
                    <Text>If your file contains multiple worksheets, <B>only the first sheet</B> will be imported.</Text>
                    <ExampleImage
                        isSuccess={true}
                        image={images.yes} />
                    <ExampleImage
                        isSuccess={false}
                        image={images.no} />
                </View>
                <View
                    style={globalStyle.card}>
                    <Title name='2. Formatting data in cells' />
                    <Text>Do not use <B>special characters</B> in columns intended for the <B>"Name" property</B>. These characters will be removed during import.</Text>
                    <Text><B>Numerical values</B> should not include text in the same cell (e.g., "50mV" should be split into "50" in one column and "mV" in another, if applicable).</Text>
                </View>
                <View
                    style={globalStyle.card}>
                    <Title name='3. Useful tips' />
                    <Text>You can import values with <B>various units</B> (e.g., "mV" instead of "V").</Text>
                    <Text>You can cancel recent imports immediately after they are performed. This option is available on the <B>Import</B> screen.</Text>
                </View>
            </ScrollView>
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