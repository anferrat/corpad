import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import { Text } from '@ui-kitten/components'
import IconButton from '../../IconButton'
import { primary } from '../../../styles/colors'

const Header = ({ onBackPress }) => {
    return (
        <View style={styles.header}>
            <IconButton
                onPress={onBackPress}
                color='#fff'
                iconName='arrow-back-outline' />
            <Text category='h6' style={styles.mainTitle} status='control'>Select reading:</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    mainTitle: {
        paddingLeft: 12
    },
    header: {
        height: StatusBar.currentHeight + 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        backgroundColor: primary,
        justifyContent: 'flex-start',
        paddingTop: StatusBar.currentHeight
    }
})