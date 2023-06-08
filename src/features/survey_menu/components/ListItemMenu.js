import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { StyleSheet, Pressable, View, ActivityIndicator } from 'react-native'
import { basic, primary, StatusColors } from '../../../styles/colors'
import { androidRipple } from '../../../styles/styles'


const ListItem = ({ status, icon, pack, title, subtitle, onPress, disabled, subtitleIcon, subtitleIconPack, subtitleIconColor }) => {
    const color = StatusColors[status] ?? primary
    return (
        <Pressable
            disabled={disabled}
            android_ripple={androidRipple}
            style={styles.pressable}
            onPress={onPress}>
            {icon === 'activityIndicator' ? <ActivityIndicator style={styles.icon} size='small' color={color} /> :
                <Icon name={icon} pack={pack} style={styles.icon} fill={color} />
            }
            <View>
                <Text category='s1'>{title}</Text>
                {subtitle ?
                    <View style={styles.subtitleView}>
                        {subtitleIcon ? <Icon name={subtitleIcon} fill={subtitleIconColor ?? basic} style={styles.subtitleIcon} pack={subtitleIconPack ?? 'cp'} /> : null}
                        <Text category='s2' appearance='hint'>{subtitle}</Text>
                    </View> : null}

            </View>
        </Pressable>
    )
}

export default ListItem

const styles = StyleSheet.create({
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingLeft: 15,
        height: 70

    },
    icon: {
        height: 25,
        width: 25,
        marginRight: 24
    },
    subtitleView: {
        alignItems: 'center',
        marginTop: 3,
        flexDirection: 'row',
    },
    subtitleIcon: {
        width: 14,
        height: 14,
        marginRight: 4,
    }
})