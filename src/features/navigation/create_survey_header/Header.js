import React from 'react'
import { StyleSheet, StatusBar } from 'react-native'
import { Text } from '@ui-kitten/components'
import { SafeAreaView } from 'react-native-safe-area-context'
import SingleIconButton from '../../../components/IconButton'
import { primary } from '../../../styles/colors'


const Header = ({ navigation, options }) => {
    return (
        <SafeAreaView style={{ ...styles.mainView, paddingTop: options.headerStatusBarHeight }}>
            <SingleIconButton
                color='#fff'
                iconName='arrow-back-outline'
                onPress={navigation.goBack} />
            <Text category='h5' status='control' style={styles.title}>New survey</Text>
        </SafeAreaView >
    )
}

export default React.memo(Header)

const styles = StyleSheet.create({
    mainView: {
        height: StatusBar.currentHeight + 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        backgroundColor: primary,
        justifyContent: 'flex-start',
    },
    title: {
        marginLeft: 12
    }
})