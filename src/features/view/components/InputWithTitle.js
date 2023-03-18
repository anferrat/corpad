import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '@ui-kitten/components'
import Input from '../../../components/Input'
import { primary } from '../../../styles/colors'


const InputWithTitle = (props) => {
    return (
        <View style={styles.mainView}>
            <Text style={styles.title} category='p2'>{props.title}</Text>
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
        alignItems: 'flex-start',
        padding: 6,
    },
    title: {
        paddingTop: 12,
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