import React from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import { Text } from '@ui-kitten/components'
import { basic300, primary } from '../../../styles/colors'
import { useSelector } from 'react-redux'

const MapLoading = () => {
    const loading = useSelector(state => state.map.loading)

    if (loading)
        return (
            <View
                pointerEvents='none'
                style={styles.mainView}>
                <ActivityIndicator
                    color={primary} />
                <Text
                    category='p2'
                    appearance='hint'
                    style={styles.text}>Loading...</Text>
            </View>
        )
    else
        return null

}

export default React.memo(MapLoading)

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        position: 'absolute',
        width: 150,
        height: 50,
        borderRadius: 25,
        elevation: 5,
        backgroundColor: '#fff',
        overflow: "hidden",
        borderWidth: 1,
        borderColor: basic300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 12
    },
    text: {
        marginLeft: 12
    }
})