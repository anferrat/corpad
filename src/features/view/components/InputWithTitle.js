import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '@ui-kitten/components'
import Input from '../../../components/Input'
import { primary } from '../../../styles/colors'


const InputWithTitle = (props) => {
    return (
        <View style={styles.mainView}>
            <Text style={styles.title} category='s1'>{props.title}</Text>
            <Input
                {...props}
                style={props.displayHint ? styles.inputViewLarge : styles.inputView}
                textAlign='center' />
        </View>
    )
}

export default React.memo(InputWithTitle)

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 6
    },
    title: {
        paddingBottom: 12,
        paddingLeft: 6,
        textTransform: 'uppercase',
        color: primary,
    },
    inputView: {
        width: 150
    },
    inputViewLarge: {
        width: 170
    }
})