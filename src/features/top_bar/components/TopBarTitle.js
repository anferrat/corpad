import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { basic, control, danger, success, warning } from '../../../styles/colors'

const statusColors = [success, warning, danger, basic]

const TopBarTitle = ({ isPrimary, title, subtitle, icon, pack, status }) => {
    return (
        <View style={styles.mainView}>
            <View style={styles.titleView}>
                {status !== undefined ?
                    <Icon icon='circle' pack='cp' style={styles.statusIcon} fill={statusColors[status] ?? basic} /> : null}
                <Text category='h6' numberOfLines={1} ellipsizeMode='tail' status={isPrimary ? 'control' : null}>{title}</Text>
            </View>
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
    },
    statusIcon: {
        width: 15,
        height: 15,
        marginRight: 6
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})