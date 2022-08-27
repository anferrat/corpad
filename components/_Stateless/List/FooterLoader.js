import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { primary } from '../../../styles/GlobalStyle'

const FooterLoader = (props) => {
    if (props.visible)
        return (
            <View
                style={props.visible ? styles.main : styles.hidden}>
                <ActivityIndicator color={primary} size='large'/>
            </View>
        )
    else return null
}

export default FooterLoader

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
    },
    hidden: {
        display: 'none',
    }
})