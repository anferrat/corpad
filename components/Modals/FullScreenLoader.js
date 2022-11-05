import React from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import { Text } from '@ui-kitten/components'
import { useSelector } from 'react-redux'
import { primary } from '../../styles/GlobalStyle'

const FullScreenLoader = () => {
    const loader = useSelector(state => state.settings.loader)
    return (
        <View style={loader.visible ? styles.mainView : styles.hidden}>
            <View style={styles.infoView}>
                <Text style={styles.bold} category={'h6'}>{loader?.title}</Text>
                <Text category='p1' style={loader.text ? styles.text : styles.hidden}>
                    {loader?.text}</Text>
                <ActivityIndicator size='large' color={primary} />
            </View>
        </View>
    )
}

export default FullScreenLoader

const styles = StyleSheet.create({
    mainView: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoView: {
        borderRadius: 12,
        backgroundColor: '#fff',
        width: '80%',
        maxWidth: 500,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12
    },
    bold: {
        fontWeight: 'bold',
        paddingVertical: 12
    },
    text: {
        paddingBottom: 12,
        textAlign: 'center'
    },
    hidden: {
        display: 'none'
    }
})