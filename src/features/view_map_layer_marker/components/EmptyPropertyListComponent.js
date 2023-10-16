import { Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet } from 'react-native'


const EmptyPropertyListComponent = () => {
  return (
    <View style={styles.container}>
      <Text
        category='label'
        appearance='hint'>
        No properties found.
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