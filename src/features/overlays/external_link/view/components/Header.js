import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { primary } from '../../../../../styles/colors'
import { ExternalLinkTypeLabels } from '../../../../../constants/labels'


const Header = ({ linkType }) => {
    return (
        <>
            <Icon
                name='nfc'
                fill={primary}
                pack='cp'
                style={styles.displayIcon} />
            <Text
                style={styles.text}
                category='p1'>
                {ExternalLinkTypeLabels[linkType]} discovered.
            </Text>
        </>
    )
}

export default Header

const styles = StyleSheet.create({
    displayIcon: {
        width: 80,
        height: 80,
        marginBottom: 8
    },
    text: {
        marginBottom: 12
    },
})