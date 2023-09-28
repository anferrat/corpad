import { Button, ListItem, Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { file, plusCircle } from '../../../components/Icons'
import { getFileSize } from '../../../helpers/functions'
import { MapLayerFeatures } from '../../../constants/global'
import FeatureCheckBox from './FeatureCheckBox'

const featureList = Object.values(MapLayerFeatures)

const GeoFileImportView = ({ filename, size, features, onSelectFeature, onSelectFile }) => {
    if (filename) {
        const { value, unit } = getFileSize(size)
        return (
            <>
                <Text category='label' appearance='hint'>Importing file</Text>
                <View style={styles.container}>

                    <ListItem
                        style={styles.listItem}
                        accessoryLeft={file}
                        title={filename}
                        description={`${value} ${unit}`}
                        disabled={true}
                    />
                </View>
                <Text category='label' appearance='hint'>Include features</Text>
                <View style={styles.tokens}>
                    {featureList.map((feature) => <FeatureCheckBox
                        key={feature}
                        onChange={onSelectFeature}
                        feature={feature}
                        checked={Boolean(~features.indexOf(feature))}
                    />)}
                </View>
            </>
        )
    }
    else
        return (
            <>
                <Text category='label' appearance='hint'>Importing file</Text>
                <View style={styles.buttonView}>
                    <Button
                        onPress={onSelectFile}
                        style={styles.button}
                        accessoryLeft={plusCircle}>
                        Select file
                    </Button>
                </View>
            </>
        )
}

export default GeoFileImportView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listItem: {
        flex: 1
    },
    tokens: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    buttonView: {
        minHeight: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: 150
    }
})