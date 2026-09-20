import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { primary } from '../../../../styles/colors'
import { ReadingParameters } from '../../constants/constants'
import { translateList } from '../../../../localization'

const IconTitle = ({ titleKey, icon, pack }) => {
    return <View
        style={styles.mainView}>
        <Icon
            pack={pack}
            name={icon}
            style={styles.icon}
            fill={primary} />
        <Text
            category='s1'
            style={styles.title}
            status='primary'>
            {translateList(titleKey)}
        </Text>
    </View>
}

const ReadingTitle = ({ reading, itemType }) => {
    return <View style={styles.wrapper}>{
        ReadingParameters[itemType][reading].filter(({ unit }) => unit !== '').map(({ titleKey, icon, pack }) => <IconTitle
            key={titleKey}
            pack={pack}
            icon={icon}
            titleKey={titleKey}
        />)}</View>
}

export default ReadingTitle



const styles = StyleSheet.create({
    pressable: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    mainView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 17,
        height: 17,
        marginRight: 6,
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
    }
})
