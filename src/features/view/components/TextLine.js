import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import { basic, primary } from '../../../styles/colors'
import Unit from '../../../components/Unit'

const TextLine = ({ value, title, icon, pack, fill, unit }) => {

    const isEmpty = value === '' || value === null || value === undefined

    if (isEmpty)
        return null
    else
        return (
            <View
                style={styles.mainView}>
                <Text
                    category='p2'
                    style={styles.title}>{title}</Text>
                <View style={styles.valueView}>
                    {icon ?
                        <Icon
                            style={styles.icon}
                            name={icon}
                            pack={pack}
                            fill={fill ?? basic} />
                        : null}
                    <Text
                        category='p1'
                        style={styles.text}>{value}</Text>
                    <Unit unit={unit} />
                </View>
            </View>
        )
}

export default React.memo(TextLine)

const styles = StyleSheet.create({
    mainView: {
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        textTransform: 'uppercase',
        color: primary,
        paddingRight: 12
    },

    valueView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
    },
    text: {
        paddingRight: 3
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 6
    }
})