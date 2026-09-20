import React from 'react'
import { View, StyleSheet } from 'react-native'
import FeatureListItem from './FeatureListItem'
import { translateOverlay } from '../../../../localization'


const Features = () => {
    return (
        <View style={styles.features}>
            <FeatureListItem
                title={translateOverlay('paywall.features.photos')}
                icon='camera'
                color='#97EC8F'
                description={translateOverlay('paywall.features.photosDescription')} />
            <FeatureListItem
                title={translateOverlay('paywall.features.mapLayers')}
                icon='globe-2'
                color='#FFEA70'
                description={translateOverlay('paywall.features.mapLayersDescription')} />
            <FeatureListItem
                title={translateOverlay('paywall.features.multimeter')}
                icon='bluetooth'
                color='#FFAF95'
                description={translateOverlay('paywall.features.multimeterDescription')} />
            <FeatureListItem
                title={translateOverlay('paywall.features.labels')}
                icon='qr-code'
                pack='cp'
                color='#9AE2FE'
                description={translateOverlay('paywall.features.labelsDescription')} />
        </View>
    )
}

export default Features

const styles = StyleSheet.create({
    features: {
        marginHorizontal: 24,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
