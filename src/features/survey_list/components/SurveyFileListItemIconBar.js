import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { basic } from '../../../styles/colors'


const SurveyFileListItemIconBar = ({ tpCount, rectifierCount, pipelineCount }) => {
    return (
        <View style={styles.iconBar}>
            <Icon
                name={'TSS'}
                pack='cp'
                style={styles.barIcon}
                fill={basic} />
            <Text
                appearance={'hint'}
                category='s2'
                style={styles.text}>
                {tpCount}
            </Text>
            <Icon
                name={'PL'}
                pack='cp'
                style={styles.barIcon}
                fill={basic} />
            <Text
                appearance={'hint'}
                category='s2'
                style={styles.text}>
                {pipelineCount}
            </Text>
            <Icon
                name={'RT'}
                pack='cp'
                style={styles.barIcon}
                fill={basic} />
            <Text
                appearance={'hint'}
                category='s2'
                style={styles.text}>
                {rectifierCount}
            </Text>
        </View>
    )
}

export default React.memo(SurveyFileListItemIconBar)

const styles = StyleSheet.create({
    barIcon: {
        width: 15,
        height: 15,
        marginRight: 3,
    },
    text: {
        marginRight: 12
    },
    iconBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12
    }
})