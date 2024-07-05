import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import Pressable from '../../../../components/Pressable'
import { basic700, control } from '../../../../styles/colors'
import { getFormattedDate } from '../../../../helpers/functions'


const GoToButton = ({ onPress, name, icon, pack, timeCreated }) => {
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
                        style={styles.text}
                        status='control'
                        ellipsizeMode={'tail'}
                        numberOfLines={1}>
                        {name === null ? 'Loading...' : `${name}`}
                    </Text>

                </View>
                {timeCreated !== null ?
                    <View style={styles.time}>
                        <Text status='control'
                            ellipsizeMode={'tail'}
                            category='s2'>
                            Added
                        </Text>
                        <Text
                            style={{ flex: 1 }}
                            status='control'
                            ellipsizeMode={'tail'}
                            numberOfLines={1}>
                            {getFormattedDate(timeCreated)}
                        </Text>

                    </View> : null}
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
        width: '90%',
        flex: 1,
        marginVertical: 12,
        alignSelf: 'center',
        overflow: 'hidden',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: 52,
    },
    time: {
    },
    text: {
        flex: 1
    }
})