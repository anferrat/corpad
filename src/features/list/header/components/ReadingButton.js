import React from 'react'
import { StyleSheet } from 'react-native'
import { androidRipple } from '../../../../styles/colors'
import ReadingTitle from './ReadingTitle'
import Pressable from '../../../../components/Pressable'

const ReadingButton = (props) => {
    return (
        <Pressable
            style={styles.pressable}
            onPress={props.onPress}
            android_ripple={androidRipple}>
            <ReadingTitle
                dataType={props.dataType}
                reading={props.reading} />
        </Pressable>
    )
}

export default ReadingButton

const styles = StyleSheet.create({
    buttonText: {
        paddingHorizontal: 6,
        fontWeight: 'bold',
    },
    icon: {
        width: 18,
        height: 18
    },
    pressable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12
    }
})