import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import Pressable from '../../../../components/Pressable'
import { basic700, control } from '../../../../styles/colors'


const GoToButton = ({ onPress, name, icon, pack }) => {
    return (
        <View
            style={styles.wrapper}>
            <Pressable
                android_ripple={{ color: basic700 }}
                isPrimary={false}
                style={styles.container}
                onPress={onPress}>
                <View
                    style={styles.container}>
                    {
                        icon === null ?
                            <ActivityIndicator
                                style={styles.icon}
                                size='small'
                                color={control} /> :
                            <Icon
                                fill={control}
                                pack={pack}
                                name={icon}
                                style={styles.icon} />
                    }
                    <Text
                        status='control'
                        ellipsizeMode={'tail'}
                        numberOfLines={1}>
                        {name === null ? 'Loading...' : `Go to ${name}`}
                    </Text>
                </View>
            </Pressable>
        </View>
    )
}


export default GoToButton

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 6,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 24
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 12,
        marginLeft: 12
    },
    wrapper: {
        borderRadius: 40,
        width: '80%',
        flex: 1,
        marginVertical: 12,
        alignSelf: 'center',
        overflow: 'hidden',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.3)'
    },
})