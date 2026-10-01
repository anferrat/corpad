import React from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { Button, Icon } from '@ui-kitten/components'
import { basic, basic300, control } from '../styles/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const BottomButton = (props) => {
    const { onPress, title, icon, pack, iconPosition } = props
    const { bottom } = useSafeAreaInsets()
    const style = props.disabled ? styles.disabled : styles.active

    const accessory = React.useCallback((accessoryProps) => {
        if (icon)
            if (icon === 'loading')
                return <ActivityIndicator size='small' color={!props.disabled ? basic : control} {...accessoryProps} />
            else return (
                <Icon {...accessoryProps} pack={pack} name={icon} />
            )
        else return null
    }, [icon, pack, props.disabled])

    return (
        <Button
            {...props}
            onPress={onPress}
            hitSlop={12}
            disabled={props.disabled}
            accessoryRight={iconPosition === 'right' ? accessory : null}
            accessoryLeft={iconPosition === 'right' ? null : accessory}
            style={{ ...style, bottom: bottom + 10 }}>
            {title}
        </Button>
    )
}

export default React.memo(BottomButton)

const styles = StyleSheet.create({
    active:
    {
        position: 'absolute',
        left: '2.5%',
        right: '2.5%',
        height: 50,
        paddingHorizontal: 15,
        zIndex: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    disabled: {
        position: 'absolute',
        bottom: 10,
        left: '2.5%',
        right: '2.5%',
        height: 50,
        paddingHorizontal: 15,
        zIndex: 10,
        backgroundColor: basic300,
    }
})
