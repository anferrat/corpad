import React from 'react'
import { Divider } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'

const SmartDivider = (props) => {
    if (props.depend?.some(item => item !== undefined && item !== null && item !== '' && item !== false) ?? false)
        return <Divider style={styles.divider} />
    else return null
}

export default SmartDivider

const styles = StyleSheet.create({
    divider: {
        marginVertical: 6
    }
})