import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import IconButton from './IconButton'
import { Text } from '@ui-kitten/components'
import { control, primary, basic300 } from '../styles/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Header = ({ title, onBackPress }) => {
    const insets = useSafeAreaInsets()

    //You may ask wtf? try do it any other way, and then lets talk
    StatusBar.setBarStyle('light-content')

    return (
        <>
            {// Do I absolutely need this StatusBar here as well ? the answer is yes
            }
            <StatusBar barStyle='light-content' />
            <View
                style={{ ...styles.topBar, minHeight: 60 + insets.top, paddingTop: insets.top }}>
                <View style={styles.leftRow}>
                    <IconButton
                        iconName={'arrow-back-outline'}
                        onPress={onBackPress}
                        color={control} />
                    <Text category='h5' ellipsizeMode='tail' numberOfLines={1} style={styles.title} status={'control'}>{title}</Text>
                </View>
                <View style={styles.rightRow}>
                </View>
            </View>
        </>
    )
}

export default Header

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        backgroundColor: primary,
        borderBottomColor: basic300,
        borderBottomWidth: 1,
    },
    rightRow: {
        flexDirection: 'row',
    },
    leftRow: {
        flexDirection: 'row',
        flex: 1,
        flexGrow: 1,
        alignItems: 'center'
    },
    title: {
        flex: 1,
        paddingLeft: 12,
        paddingBottom: 3
    }
})