import React, { useEffect, useRef, useState } from 'react'
import MapButton from './buttons/MapButton'
import NewItemView from './animated/NewItemView'

const NewItem = ({ createItemHandler, active, shareNewItemLocation }) => {
    const [loading, setLoading] = useState({
        TEST_POINT: false,
        RECTIFIER: false
    })

    const componentMounted = useRef(true)

    const onCreate = React.useCallback(async (itemType) => {
        setLoading(old => ({ ...old, [itemType]: true }))
        await createItemHandler(itemType)
        setTimeout(() => {
            //to account for animation
            if (componentMounted.current)
                setLoading(old => ({ ...old, [itemType]: false }))
        }, 300)
    }, [createItemHandler])

    useEffect(() => {
        componentMounted.current = true
        return () => {
            componentMounted.current = false
        }
    }, [])

    return (
        <NewItemView
            visible={active}>
            <MapButton
                icon='share'
                onPress={shareNewItemLocation} />
            <MapButton
                icon={loading.TEST_POINT ? 'spinner' : 'TS-filled'}
                pack='cp'
                onPress={onCreate.bind(this, 'TEST_POINT')}
                status='primary'
                disabled={loading.TEST_POINT || loading.RECTIFIER} />
            <MapButton
                icon={loading.RECTIFIER ? 'spinner' : 'RT-filled'}
                pack='cp'
                onPress={onCreate.bind(this, 'RECTIFIER')}
                status='primary'
                disabled={loading.TEST_POINT || loading.RECTIFIER} />
        </NewItemView>
    )

}


export default React.memo(NewItem)