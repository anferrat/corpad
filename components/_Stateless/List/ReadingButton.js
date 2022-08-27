import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { basic200 } from '../../../styles/GlobalStyle'
import ReadingTitle from './ReadingTitle'

const ReadingButton = (props) => {
    return (
        <Pressable
            style={styles.pressable}
            onPress={props.onPress}
            android_ripple={{ color: basic200 }}>
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