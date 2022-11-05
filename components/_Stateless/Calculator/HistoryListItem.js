import React, { useRef, useEffect } from 'react'
import { View, StyleSheet, Pressable, Animated } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { androidRipple, androidStyle, basic, primary, success } from '../../../styles/GlobalStyle'
import SingleIconButton from '../SingleIconButton'
import { warningHandler } from '../../errorHandler'

const HistoryListItem = (props) => {
    const scale = useRef(new Animated.Value(1))

    const onDeleteHandler = React.useCallback(async () => {
        const confirm = await warningHandler(46, 'Delete', 'Cancel')
        if (confirm) {
            Animated.timing(scale.current, {
                toValue: 0,
                duration: 400,
                useNativeDriver: false
            }).start(props.onDeleteHandler)
        }
    }, [props.onDeleteHandler])

    return (
        <Animated.View style={{
            height: scale.current.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 78],
            }),
            transform: [{ scale: scale.current }]
        }}>
            <Pressable style={{ ...androidStyle.ConnectionCard, ...styles.mainView }} android_ripple={androidRipple} onPress={props.onPress}>
                <View style={styles.titleView}>
                    <Icon name={props.icon} style={styles.icon} pack={props.pack} fill={primary} />
                    <View style={styles.textView}>
                        <Text category='s1' numberOfLines={1} ellipsizeMode={'tail'} style={styles.title}>{props.title}</Text>
                        <Text category='c1' appearance='hint'>{props.subtitle}</Text>
                    </View>
                </View>
                {props.active ?
                    <Icon style={styles.activeIcon} fill={success} name='checkmark-outline' />
                    :
                    <SingleIconButton
                        color={basic}
                        iconName='trash'
                        size='small'
                        onPress={onDeleteHandler}
                    />}
            </Pressable>
        </Animated.View>
    )
}

export default React.memo(HistoryListItem)

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 18
    },
    activeIcon: {
        width: 25,
        height: 25,
        marginRight: 6,
        marginLeft: 12
    },
    title: {
        flex: 1
    },
    textView: {
        flex: 1
    },
})
