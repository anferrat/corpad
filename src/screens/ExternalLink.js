import React from 'react'
import { View } from 'react-native'
import { globalStyle } from '../styles/styles'
import { ExternalLinkView } from '../features/overlays/external_link'

export default ExternalLinkScreen = ({ route, navigation }) => {
    const { link } = route.params

    return (
        <View>
            <ExternalLinkView
                link={link} />
        </View>
    )
}