import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { primary } from '../../../../../styles/colors'
import { ExternalLinkTypeLabels } from '../../../../../constants/labels'
import IconLine from '../../../../../components/ItemView/components/IconLine'
import { ExternalLinkTypeIcons } from '../../../../../constants/icons'


const Header = ({ linkType, tagId, technician }) => {
    return (
        <View
            style={styles.container}>
            <Icon
                name={ExternalLinkTypeIcons[linkType]}
                fill={primary}
                pack='cp'
                style={styles.displayIcon} />
            <View>
                <Text
                    style={styles.text}
                    category='s1'>
                    {ExternalLinkTypeLabels[linkType]}
                </Text>
                <Text
                    style={styles.text}
                    category='s2'
                    appearance='hint'>
                    TAG ID: {tagId}
                </Text>
                {technician ?
                    <Text
                        style={styles.text}
                        category='s2'
                        appearance='hint'>
                        Created by: {technician}
                    </Text> : null}
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    displayIcon: {
        width: 55,
        height: 55,
        margin: 12,
        marginRight: 12
    },
    text: {
    },
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
})