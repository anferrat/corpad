import { Divider, Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import Header from '../../../../components/Header'
import { basic300 } from '../../../../styles/colors'
import { globalStyle } from '../../../../styles/styles'
import DetailRow from './DetailRow'
import EmptyDetailsComponent from './EmptyDetailsComponent'

const ModalDetails = ({ hideModal, warnings }) => {

    const renderItem = ({ item }) => {
        return (
            <DetailRow
                index={item.rowIndex}
                warnings={item.warnings}
                success={item.success}
            />
        )
    }

    return (
        <>
            <Header
                title={'Import details'}
                onBackPress={hideModal} />
            <View style={styles.mainView}>
                <View style={globalStyle.card}>
                    <Text category='label' appearance='hint' style={styles.title}>Imported rows with issues</Text>
                    <FlatList
                        ListEmptyComponent={EmptyDetailsComponent}
                        keyExtractor={(item) => item.rowIndex}
                        data={warnings}
                        renderItem={renderItem} />
                </View>
            </View>
        </>
    )
}
export default ModalDetails

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: basic300
    },
    title: {
        paddingBottom: 6
    }
})