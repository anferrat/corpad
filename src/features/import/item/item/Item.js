import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { globalStyle } from '../../../../styles/styles'
import Pipeline from './Pipeline'
import Rectifier from './Rectifier'
import TestPoint from './TestPoint'
import AddSubitemButton from './AddSubitemButton'
import SubitemList from './SubitemList'

const ItemView = () => {
    return (
        <>
            <View style={globalStyle.card}>
                <ItemSelector />
                <View style={styles.button}>
                    <AddSubitemButton />
                </View>
            </View>
            <SubitemList />
        </>
    )
}

export default ItemView

const ItemSelector = React.memo(() => {
    const itemType = useSelector(state => state.importData.itemType)
    switch (itemType) {
        case 'TEST_POINT':
            return <TestPoint />
        case 'RECTIFIER':
            return <Rectifier />
        case 'PIPELINE':
            return <Pipeline />
        default:
            return null
    }
})

const styles = StyleSheet.create({
    button: {
        marginHorizontal: -12,
        marginBottom: -12
    }
})

