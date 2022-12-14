import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { basic, control } from '../../../styles/colors'

const TopBarTitle = ({ isPrimary, title, subtitle, icon, pack }) => {
    return (
        <View style={styles.mainView}>
            <Text category='h6' numberOfLines={1} ellipsizeMode='tail' status={isPrimary ? 'control' : null}>{title}</Text>
            <View style={styles.subtitleView}>
                <Text category={'s2'} appearance='hint' status={isPrimary ? 'control' : null}>
                    {subtitle}</Text>
                {icon ?
                    <Icon
                        fill={isPrimary ? control : basic}
                        style={styles.icon}
                        pack={pack}
                        name={icon} /> :
                    null}
            </View>
        </View>
    )
}

export default TopBarTitle

const styles = StyleSheet.create({
    mainView: {
        paddingRight: 24,
        paddingLeft: 12,
        flex: 1
    },
    subtitleView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        height: 16,
        width: 16,
        marginLeft: 6
    }
})