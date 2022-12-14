import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import IconButton from './IconButton'
import { Text } from '@ui-kitten/components'
import { control, primary, basic300 } from '../styles/colors'

const Header = ({ title, onBackPress }) => {
    return (
        <View style={styles.topBar} >
            <StatusBar
                barStyle={'light-content'}
                translucent={true}
                backgroundColor='transparent' />
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
    )
}

export default React.memo(Header)

const styles = StyleSheet.create({
    topBar: {
        height: StatusBar.currentHeight + 60,
        paddingTop: StatusBar.currentHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        backgroundColor: primary,
        paddingVertical: 3,
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