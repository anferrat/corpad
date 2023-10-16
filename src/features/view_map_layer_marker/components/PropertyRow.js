import React, { useMemo } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { convertValue } from '../helpers/functions'
import { Text } from '@ui-kitten/components'
import { basic400 } from '../../../styles/colors'


const PropertyRow = ({ property, value, isEven }) => {
  const convertedValue = useMemo(() => convertValue(value), [])
  return (
    <View
      style={isEven ? styles.row : styles.row_colored}>
      <View
        style={styles.property}>
        <Text
          style={styles.text}>{property}</Text>
      </View>
      <View
        style={styles.value}>
        <Text
          style={styles.text}>{convertedValue}</Text>
      </View>
    </View>
  )
}

export default React.memo(PropertyRow)

const styles = StyleSheet.create({
  property: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 12
  },
  value: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 6
  },
  row_colored: {
    flexDirection: 'row',
    paddingVertical: 6,
    backgroundColor: basic400
  },
  text: {
    fontFamily: Platform.select({
      ios: 'Courier',
      android: 'monospace',
      default: 'monospace'
    })
  }
})