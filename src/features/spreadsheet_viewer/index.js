import React from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useDataFromFile } from './hooks/useDataFromFile'
import { Text } from '@ui-kitten/components'
import LoadingView from '../../components/LoadingView'
import { basic200, basic300, control } from '../../styles/colors'

export const SpreadsheetViewer = ({ uri }) => {
    const { loading, data, fields, limitReached } = useDataFromFile(uri)

    const renderItem = ({ item, index }) => (
        <>
            <View style={index % (fields.length + 1) === 0 ? styles.rowHeader : styles.cell}>
                <Text numberOfLines={1} ellipsizeMode={'tail'}>{item}</Text>
            </View>
        </>
    )
    const Header = () => (
        <View style={styles.header}>
            <View style={styles.rowHeader} />
            {fields.map((field, i) =>
                <View style={styles.columnHeader}
                    key={`${i + 1}_column`}>
                    <Text numberOfLines={1} ellipsizeMode={'tail'}>
                        {field}
                    </Text>
                </View>)}
            {limitReached.field ? <View style={styles.columnHeader}>
                <Text numberOfLines={1} ellipsizeMode={'tail'}>...</Text>
            </View> : null}
        </View>
    )

    const Footer = () => {
        if (limitReached.row || limitReached.field)
            return <View style={styles.hint}>
                <Text category='s2' status='danger'>* This is a preview feature, unabled to process large csv files.{`\n`}Please use third party apps to view this file in full.</Text>
            </View>
        else return null
    }
    return (
        <LoadingView loading={loading}>
            <ScrollView horizontal={true}>
                <FlatList
                    ListHeaderComponent={Header}
                    ListFooterComponent={Footer}
                    contentContainerStyle={styles.mainView}
                    data={data.flat().concat(limitReached.row ? '...' : [])}
                    renderItem={renderItem}
                    numColumns={fields.length + 1}
                />
            </ScrollView>
        </LoadingView >


    )
}


const styles = StyleSheet.create({
    mainView: {
        backgroundColor: control
    },
    cell: {
        width: 120,
        height: 25,
        borderEndWidth: 1,
        borderBottomWidth: 1,
        borderColor: basic300,
        paddingHorizontal: 12
    },
    rowHeader: {
        width: 30,
        height: 25,
        borderEndWidth: 1,
        borderBottomWidth: 1,
        borderColor: basic300,
        backgroundColor: basic200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    columnHeader: {
        width: 120,
        height: 25,
        borderColor: basic300,
        backgroundColor: basic200,
        alignItems: 'center',
        justifyContent: 'center',
        borderEndWidth: 1,
        borderBottomWidth: 1,
        paddingHorizontal: 3
    },
    header: {
        flexDirection: 'row'
    },
    hint: {
        padding: 12
    }
})

/*

{data.map((row, index) => <View key={`row_${index}`} style={{ flexDirection: 'row' }}>
                        {row.map(renderItem)}
                    </View>)}
                </ScrollView>

                */