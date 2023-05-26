import React from 'react'
import { Divider, Text } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import { fieldProperties } from '../../../constants/fieldProperties'
import AttributeMapElement from './components/AttributeMapElement'
import { basic200, control } from '../../../styles/colors'

const AttributeMapper = (props) => {

    const renderItem = (item, i) => {
        //if (item.index !== null)
        return (
            <View style={i % 2 ? styles.even : styles.odd} key={item.index}>
                <AttributeMapElement
                    standardValue={props.itemListLabels[item.index] ?? 'Error'}
                    icon={fieldProperties[props.property].accessoryList[item.index]}
                    onDelete={props.removeAttribute.bind(this, item.index)}
                    mappedValues={item.mappedValues.map(v => v === '' ? '<Empty>' : v)}
                />
            </View>
        )
    }

    return <View style={styles.mainView}>
        {props.attributeMap.length === 0 ?
            <View style={styles.empty}>
                <Text category={'s2'} appearance='hint'>No mapped attributes.</Text>
            </View>
            : props.attributeMap.map(renderItem)}
    </View>
}

export default React.memo(AttributeMapper)

const styles = StyleSheet.create({
    mainView: {
        borderRadius: 10,
        borderColor: basic200,
        borderWidth: 1,
        overflow: 'hidden',
        marginTop: 12,
    },
    odd: {
        backgroundColor: control,
        paddingHorizontal: 12
    },
    even: {
        backgroundColor: basic200,
        paddingHorizontal: 12
    },
    empty: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    }
})