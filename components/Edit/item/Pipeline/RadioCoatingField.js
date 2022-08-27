import React from 'react'
import { Radio, RadioGroup, Text } from '@ui-kitten/components'
import { useDispatch } from 'react-redux'
import { updateProperty } from '../../../../store/actions/item'

const RadioCoatingField = (props) => {
  const dispatch = useDispatch()
  const submitValue = (index, coated) => {
    if ((index === 0) === coated)
      dispatch( updateProperty(null, 'coating'))
    else
      dispatch( updateProperty(index === 0, 'coating'))
  }

  return (
    <>
      <Text category='label' appearance='hint' style={{ paddingBottom: 3 }}>Coating</Text>
      <RadioGroup
        style={{ width: 90, paddingBottom: 12 }}
        selectedIndex={props.coated === null ? '' : props.coated ? 0 : 1}
        onChange={index => submitValue(index, props.coated)}>
        {props.itemsList.map(item => <Radio key={'radioOption - ' + item}>{item}</Radio>)}
      </RadioGroup>
    </>
  )
}

export default React.memo(RadioCoatingField)