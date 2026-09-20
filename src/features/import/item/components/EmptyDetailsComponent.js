import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import { translateImport } from '../../../../localization'

const EmptyDetailsComponent = () => {
    return (
        <View style={styles.mainView}>
            <Text category='s2' appearance='hint'>{translateImport('item.importedSuccessfully')}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12
    }
})

export default EmptyDetailsComponent
