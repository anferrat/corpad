import React from 'react'
import { ProgressBar } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'



const LoaderProgressBar = ({ total, count }) => {
  const progress = total ? count / total : 1
  return (
    <View style={styles.container}>
      <ProgressBar
        progress={progress}
        status='primary'
      />
    </View>
  )
}

export default React.memo(LoaderProgressBar)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 12
  },
})