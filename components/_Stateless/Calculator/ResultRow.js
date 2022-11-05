import { Text, Icon } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { basic } from '../../../styles/GlobalStyle'
import Unit from '../Unit'


const ResultRow = (props) => {
    return <View style={styles.mainView}>
        <View style={styles.titleView}>
            <Icon name={props.icon} pack={props.pack} style={styles.icon} fill={basic} />
            <Text category='s1' numberOfLines={1} ellipsizeMode={'tail'} style={styles.mainTitle}>{props.title} <Text category='s1'>{props.subtitle}</Text></Text>
        </View>
        {props.results.map(r => (
            <View key={r.title} style={styles.result}>
                <Text appearance='hint' category='s2' style={styles.title}>{r.title}</Text>
                <View style={styles.valueView}>
                    <Text style={styles.value} numberOfLines={1} ellipsizeMode={'tail'}>{r.value ?? 'Error'}</Text>
                    <Unit unit={r.unit} />
                </View>
            </View>
        ))}
    </View>
}

export default ResultRow

const styles = StyleSheet.create({
    mainView: {
        paddingBottom: 12,
        flex: 1,
    },
    result: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 2,
    },
    value: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'right'
    },
    listItem: {
        backgroundColor: 'rgba(0,0,0,0)'
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 12
    },
    titleView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    valueView: {
        flex: 1,
        flexDirection: 'row'
    },
    title: { maxWidth: '35%' },
    mainTitle: {
        flex: 1
    }
})