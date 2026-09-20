import React from 'react'
import { Radio, RadioGroup, Text } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import { translateEdit } from '../../../../localization'

const PipelineCoating = ({ coating, update }) => {

  const updateCoating = React.useCallback((value) => update(value, 'coating'), [update])
  
  return (
    <>
       <Text category='label' appearance='hint' style={styles.text}>{translateEdit('coating')}</Text>
      <RadioGroup
        style={styles.radio}
        selectedIndex={Number(coating)}
        onChange={updateCoating}>
         <Radio>{translateEdit('bare')}</Radio>
         <Radio>{translateEdit('coated')}</Radio>
      </RadioGroup>
    </>
  )
}

export default React.memo(PipelineCoating)

const styles = StyleSheet.create({
  text: {
    paddingBottom: 3,
  },
  radio: {
    width: 90,
    paddingBottom: 12
  }
})
