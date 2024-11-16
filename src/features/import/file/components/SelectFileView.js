import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { basic400, primary } from '../../../../styles/colors'

const SelectFileView = (props) => {
    return (
        <>
            <Text style={styles.title}>SELECT FILE</Text>
            <View style={styles.mainView}>
                <Icon
                    style={styles.icon}
                    fill={primary}
                    name='download-outline' />
                <Text
                    appearance={'hint'}
                    style={styles.text}
                    category='s1'>
                    Only comma-separated text files (.csv) are supported. First row should be headers. Check corpad.ca to learn how to format your files.</Text>
                {props.children}
            </View>
        </>
    )
}

export default SelectFileView

const styles = StyleSheet.create({
    mainView: {
        margin: 12,
        marginTop: 0,
        paddingVertical: 24,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: basic400,
        borderStyle: 'dashed'
    },
    title: {
        margin: 12,
        fontSize: 16,
        fontWeight: 'bold',
    },
    text: {
        margin: 12,
        textAlign: 'center'
    },
    icon: {
        width: 50,
        height: 50,
    },
})