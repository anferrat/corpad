import React from 'react'
import SingleIconButton from '../_Stateless/SingleIconButton'
import { View, StyleSheet, StatusBar } from 'react-native'
import { Text } from '@ui-kitten/components'
import { androidStyle, primary } from '../../styles/GlobalStyle'
import { SafeAreaView } from 'react-native-safe-area-context'
import { calculatorTypes } from '../../constants/constants'
import InfoModal from './InfoModal'

const TopBar = (props) => {
    const calcType = props.route.params?.calculatorType
    return <SafeAreaView style={{ ...androidStyle.TopBar, ...styles.mainView }}>
        <StatusBar
            backgroundColor={'transparent'}
            translucent={true}
            barStyle={'light-content'} />
        <View style={styles.titleView}>
            <SingleIconButton
                color='#fff'
                iconName='arrow-back-outline'
                onPress={props.navigation.goBack} />
            <Text style={styles.title} category='h5' numberOfLines={1} ellipsizeMode={'tail'}>{calculatorTypes[calcType]?.title ?? 'Corrosion calculator'}</Text>
            <InfoModal
                calculatorType={calcType}
                display={calcType ?? false} />
        </View>
    </SafeAreaView>
}

export default TopBar

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: primary,
        paddingVertical: 3,
        elevation: 5
    },
    title: {
        paddingLeft: 12,
        paddingBottom: 5,
        color: '#fff',
        marginRight: 12,
        flex:1
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})