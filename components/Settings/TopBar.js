import React from 'react'
import SingleIconButton from '../_Stateless/SingleIconButton'
import { View, StyleSheet, StatusBar } from 'react-native'
import { Text } from '@ui-kitten/components'
import { androidStyle, primary } from '../../styles/GlobalStyle'
import { SafeAreaView } from 'react-native-safe-area-context'

const getTitleBySettingType = (setting) => {
    switch (setting) {
        case 'defaultNames':
            return 'Default names'
        case 'potentials':
            return 'Potentials'
        case 'refCells':
            return 'Reference cells'
        case 'export':
            return 'Export as CSV'
        case 'exportedFiles':
            return 'Exported files'
        case 'info':
            return 'Survey information'
        default:
            return 'Settings'
    }
}

const TopBar = (props) => {
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
            <Text style={styles.title} category='h5'>{getTitleBySettingType(props.route.params?.setting)}</Text>
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
        paddingLeft: 24,
        paddingBottom: 5,
        color: '#fff'
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})