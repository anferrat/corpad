import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { primary } from '../../../../styles/colors'
import { ReadingParameters } from '../../constants/constants'

const IconTitle = ({ title, icon, pack }) => {
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
            {title}
        </Text>
    </View>
}

const ReadingTitle = ({ reading, itemType }) => {
    return <>{
        ReadingParameters[itemType][reading].filter(({ unit }) => unit !== '').map(({ title, icon, pack }) => <IconTitle
            key={title}
            pack={pack}
            icon={icon}
            title={title}
        />)}</>
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
        paddingRight: 12,
    },
    icon: {
        width: 17,
        height: 17,
        marginRight: 6,
    },
    title: {
        fontWeight: 'bold'
    }
})