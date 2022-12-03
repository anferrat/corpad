import React from 'react'
import { Toggle, Layout, Text } from '@ui-kitten/components'
import { updateSubitemProperty } from '../../../../store/actions/subitem'
import { useDispatch } from 'react-redux'
import InputField from '../InputField'

const CurrentInput = React.memo((props) => {
    if (props.shorted)
        return <InputField
            value={props.current === '' || props.current === null ? '0' : props.current}
            valid={props.valid}
            maxLength={8}
            keyboardType='numeric'
            unit={'A'}
            property='current'
            label='Shorting current' />
    else return null
})

const IsolationView = (props) => {
    const dispatch = useDispatch()

    const updateShort = React.useCallback((shorted) => {
        dispatch(updateSubitemProperty(!shorted, 'shorted'))
        if (shorted) {
            dispatch(updateSubitemProperty(0, 'current', true))
            dispatch(updateSubitemProperty(true, 'fromAtoB'))
        }
    }, [dispatch])

    return (
        <Layout style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            height: 80
        }}>
            <Toggle
                style={{ paddingRight: 6, paddingTop: 8 }}
                status={!props.shorted ? 'basic' : 'danger'}
                checked={!!props.shorted}
                onChange={updateShort.bind(this, props.shorted)}>
                <Text
                    status={!props.shorted ? 'basic' : 'danger'}
                    style={{ fontWeight: 'bold', fontSize: 13 }}>Shorted</Text>
            </Toggle>
            <Layout style={{ flex: 1, paddingLeft: 6 }}>
                <CurrentInput
                    shorted={props.shorted}
                    valid={props.valid}
                    current={props.current} />
            </Layout>
        </Layout>
    )
}

export default React.memo(IsolationView)