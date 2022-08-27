import React from 'react'
import { StyleSheet } from 'react-native'
import SingleIconButton from '../../_Stateless/SingleIconButton'
import { androidStyle, primary } from '../../../styles/GlobalStyle'
import { Text } from '@ui-kitten/components'
import { SafeAreaView } from 'react-native-safe-area-context'

const Header = (props) => {
    return (
        <SafeAreaView style={{ ...androidStyle.TopBar, ...styles.mainView }}>
            <SingleIconButton
                color='#fff'
                iconName='arrow-back-outline'
                onPress={props.goBack} />
            <Text category='h5' status='control' style={styles.title}>New survey</Text>
        </SafeAreaView >
    )
}

export default React.memo(Header)

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: primary,
        justifyContent: 'flex-start',
        paddingVertical: 3,
        elevation: 5
    },
    title: {
        marginLeft: 12
    }
})