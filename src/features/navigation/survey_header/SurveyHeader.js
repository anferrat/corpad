import React, { useContext } from 'react'
import { View, StyleSheet, StatusBar, Pressable } from 'react-native'
import { useDispatch } from 'react-redux'
import { Icon } from '@ui-kitten/components'
import { primary } from '../../../styles/colors'
import { androidRipple } from '../../../styles/styles'
import SingleIconButton from '../../../components/IconButton'
import SurveyTitle from './SurveyTitle'
import { BS } from '../../../../App'
import { updateSetting } from '../../../store/actions/settings'
import { errorHandler } from '../../../helpers/error_handler'
import CloudButton from './CloudButton'


const Header = (props) => {
    const bottomSheet = useContext(BS)
    const dispatch = useDispatch()
    const navigateToDevScreen = () => props.navigation.navigate('DevScreen')
    const navigateToSurveyInfo = () => props.navigation.navigate('SettingDetails', { setting: 'info' })
    const openMenuHandler = () => {
        if (bottomSheet.current.snapToIndex)
            bottomSheet.current.snapToIndex(2)
        else errorHandler(503)
        dispatch(updateSetting('bottomSheetContent', { itemType: null, content: 'menu' }))
    }
    const navigateToSearch = () => props.navigation.navigate('Search')
    return (
        <View style={{ ...styles.mainView, paddingTop: props.options.headerStatusBarHeight }} >
            <StatusBar
                backgroundColor={'transparent'}
                translucent={true}
                barStyle='dark-content' />
            <View style={styles.leftSide}>
                <View style={styles.pressableWrapper}>
                    <Pressable onPress={navigateToSurveyInfo} android_ripple={androidRipple} style={styles.pressable}>
                        <Icon pack='cp'
                            name='corpad-logo'
                            style={styles.logo}
                            fill={primary} />
                        <SurveyTitle />
                    </Pressable>
                </View>
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
        height: StatusBar.currentHeight + 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    leftSide: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        flexGrow: 1
    },
    rightSide: {
        flexBasis: 120,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flexShrink: 0
    },
    logo: {
        height: 25,
        width: 25,
        marginRight: 6
    },
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 6,
    },
    pressableWrapper: {
        flexDirection: 'row',
        overflow: 'hidden',
        borderRadius: 10,
    }
})