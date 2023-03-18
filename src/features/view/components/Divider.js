import React from 'react'
import { Divider as DefaultDivider } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'

const Divider = ({ visible }) => {
    if (visible)
        return <DefaultDivider style={styles.divider} />
    else return null
}

export default Divider

const styles = StyleSheet.create({
    divider: {
        marginVertical: 6
    }
})