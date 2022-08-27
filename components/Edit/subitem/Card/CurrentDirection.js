import React from 'react'
import { Icon } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import { basic1000 } from '../../../../styles/GlobalStyle'

//Move to stateLess

const CurrentDirection = (props) => {
    const arrow = props.fromAtoB ? 'arrow-forward-outline' : 'arrow-back-outline'
    const displayArrow = props.shorted === undefined || props.shorted
    return <Icon fill={basic1000} style={styles.icon} name={displayArrow ? arrow : 'IK'} pack={!displayArrow ? 'cp' : undefined} />
}
export default CurrentDirection

const styles = StyleSheet.create({
    icon: {
        height: 25,
        width: 25
    }
})