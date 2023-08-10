import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '@ui-kitten/components'
import Input from '../../../components/Input'
import { primary } from '../../../styles/colors'
import IconButton from '../../../components/IconButton'


const InputWithTitle = (props) => {
    return (
        <View style={styles.mainView}>
            <Text style={styles.title} category='s1' numberOfLines={1} ellipsizeMode={'tail'}>{props.title}</Text>
            <View style={styles.input}>
                {props.multimeterAvailable ?
                    <IconButton
                        style={styles.button}
                        iconName='radio'
                        onPress={props.onMultimeterPress}
                    /> : null}
                <Input
                    {...props}
                    style={props.displayHint ? styles.inputViewLarge : styles.inputView}
                    textAlign='center' />

            </View>
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
        flex: 1
    },
    inputView: {
        width: 150
    },
    inputViewLarge: {
        width: 170
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
       marginBottom: 12,
       marginRight: 12,
       width: 40, 
    }
})