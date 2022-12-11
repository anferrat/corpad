import React, { useState, useEffect } from 'react'
import { globalStyle } from '../../styles/styles'
import { View } from 'react-native'
import LoadingView from '../../components/LoadingView'
import Licenses from '../../features/settings/about/Licenses'

export default SettingsScreen = ({ navigation, route }) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => setLoading(false), 10)
    }, [])

    return (
        <View style={globalStyle.screen}>
            <LoadingView loading={loading}>
                <Licenses />
            </LoadingView>
        </View>
    )
}