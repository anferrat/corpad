import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { primary, danger, basic, success } from '../../../../styles/colors'
import { androidRipple } from '../../../../styles/styles'
import Pressable from '../../../../components/Pressable'


const ListItem = (props) => {
    const color = React.useMemo(() => props.status === 'danger' ? danger : (props.status === 'basic' ? basic : (props.status === 'success' ? success : primary)), [props.status])
    return (
        <Pressable
            disabled={props.disabled}
            android_ripple={androidRipple}
            style={styles.pressable}
            onPress={props.onPress}>
            {props.icon === 'activityIndicator' ? <ActivityIndicator style={styles.icon} size='small' color={color} /> :
                <Icon name={props.icon} pack={props.pack} style={styles.icon} fill={color} />
            }
            <View>
                <Text category='s1' style={{ fontWeight: props.selected ? 'bold' : 'normal' }}>{props.title}</Text>
                {props.subtitle ?
                    <Text category='s2' appearance='hint'>{props.subtitle}</Text> : null}
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
})