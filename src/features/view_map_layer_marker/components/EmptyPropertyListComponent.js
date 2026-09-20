import { Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { translateMapLayerMarker } from '../../../localization'


const EmptyPropertyListComponent = () => {
  return (
    <View style={styles.container}>
      <Text
        category='label'
        appearance='hint'>
        {translateMapLayerMarker('noProperties')}
      </Text>
    </View>
  )
}

export default EmptyPropertyListComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
