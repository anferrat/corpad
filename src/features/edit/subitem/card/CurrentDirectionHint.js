import React from 'react'
import { Text, Icon, Layout } from '@ui-kitten/components'
import { TouchableWithoutFeedback } from 'react-native'
import { useDispatch } from 'react-redux'
import { updateSubitemProperty } from '../../../../store/actions/subitem'
import { basic } from '../../../../styles/colors'

const CurrentDirectionHint = (props) => {
    const dispatch = useDispatch()
    const updateDirection = React.useCallback((fromAtoB) => dispatch(updateSubitemProperty(!fromAtoB, 'fromAtoB')), [dispatch])
    const caption = props.fromAtoB ? 'from side A to side B' : 'from side B to side A'
    if (props.shorted || props.shorted === undefined)
        return <Layout style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 6 }}>
            <Icon name='alert-circle-outline' fill={basic} style={{ width: 17, height: 17, marginRight: 3 }} />
            <Text appearance='hint' category='label' style={{ paddingVertical: 6 }}> Current travels {caption}. </Text>
            <TouchableWithoutFeedback onPress={updateDirection.bind(this, props.fromAtoB)}><Text status='primary' category='label' style={{ textDecorationLine: 'underline' }}>Change</Text></TouchableWithoutFeedback>
        </Layout>
    else return null
}
export default React.memo(CurrentDirectionHint)