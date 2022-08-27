import React, { useContext } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import { Icon } from '@ui-kitten/components'
import { androidStyle, primary } from '../../styles/GlobalStyle'
import SingleIconButton from '../_Stateless/SingleIconButton'
import SurveyTitle from './SurveyTitle'
import { BS } from '../../App'
import { useDispatch } from 'react-redux'
import { updateSetting } from '../../store/actions/settings'
import { errorHandler } from '../errorHandler'
import CloudButton from './CloudButton'


const Header = (props) => {
    const bottomSheet = useContext(BS)
    const dispatch = useDispatch()
    const openMenuHandler = () => {
        if (bottomSheet.current.snapToIndex)
            bottomSheet.current.snapToIndex(2)
        else errorHandler(503)
        dispatch(updateSetting('bottomSheetContent', { itemType: null, content: 'menu' }))
    }
    const navigateToSearch = () => props.navigation.navigate('Search')

    return (
        <View style={{ ...androidStyle.TopBar, ...styles.mainView, paddingTop: props.options.headerStatusBarHeight }} >
            <StatusBar
                backgroundColor={'transparent'}
                translucent={true}
                barStyle='dark-content' />
            <View style={styles.leftSide}>
                <Icon pack='cp'
                    name='corpad-logo'
                    style={styles.logo}
                    fill={primary} />
                <SurveyTitle />
            </View>
            <View style={styles.rightSide}>
                <CloudButton />
                <SingleIconButton
                    iconName='search'
                    onPress={navigateToSearch} />
                <SingleIconButton
                    iconName='more-vertical-outline'
                    onPress={openMenuHandler} />
            </View>
        </View >
    )
}

export default Header

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
    },
    leftSide: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    rightSide: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    logo: {
        height: 25,
        width: 25,
        marginRight: 6
    }
})