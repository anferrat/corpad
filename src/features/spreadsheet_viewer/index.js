import React from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useDataFromFile } from './hooks/useDataFromFile'
import { Text } from '@ui-kitten/components'
import LoadingView from '../../components/LoadingView'
import { basic200, basic300, control } from '../../styles/colors'

export const SpreadsheetViewer = ({ uri }) => {
    const { loading, data, fields } = useDataFromFile(uri)
    const renderItem = ({ item }) => (
        <View style={styles.cell}>
            <Text numberOfLines={1} ellipsizeMode={'tail'}>{item}</Text>
        </View>
    )
    const Header = () => (
        <View style={styles.header}>
            {fields.map((field, i) => <View style={styles.columnHeader} key={`${i + 1}_column`}><Text numberOfLines={1} ellipsizeMode={'tail'}>{field}</Text></View>)}
        </View>
    )
    return (
        <LoadingView loading={loading}>
            <ScrollView horizontal={true} >
                <View>
                    <View style={styles.rowHeader}></View>
                    {data.map((_, i) => <View style={styles.rowHeader} key={`${i + 1}_row`}><Text numberOfLines={1} ellipsizeMode={'tail'}>{i + 1}</Text></View>)}
                </View>
                <FlatList
                    ListHeaderComponent={Header}
                    contentContainerStyle={styles.mainView}
                    data={data.flat()}
                    renderItem={renderItem}
                    numColumns={fields.length}
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
        paddingHorizontal: 6
    },
    header: {
        flexDirection: 'row'
    }
})

/*

{data.map((row, index) => <View key={`row_${index}`} style={{ flexDirection: 'row' }}>
                        {row.map(renderItem)}
                    </View>)}
                </ScrollView>

                */