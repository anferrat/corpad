import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import SingleIconButton from '../_Stateless/SingleIconButton'
import { androidStyle, primary } from '../../styles/GlobalStyle'
import { Icon } from '@ui-kitten/components'
import { openSurveyExternal } from '../surveyManagement'
import { errorHandler } from '../errorHandler'
import { useDispatch } from 'react-redux'
import { updateSetting, loadSurveySettings } from '../../store/actions/settings'
import DocumentPicker from 'react-native-document-picker'


const Header = ({ navigation, options }) => {
    const navigateToCreate = () => navigation.navigate('CreateSurvey')
    const dispatch = useDispatch()

    const navigateToDevScreen = () => navigation.navigate('DevScreen')

    const openSurveyHandler = async () => {
        try {
            const externalFile = await DocumentPicker.pickSingle({ allowMultiSelection: false, type: 'application/json' })
            dispatch(updateSetting('loader', { visible: true, title: 'Opening' }))
            const extSurvey = await openSurveyExternal(externalFile.uri, externalFile.name)
            if (extSurvey.status === 200)
                dispatch(loadSurveySettings({
                    isLoaded: true,
                    name: extSurvey.name,
                    fileName: extSurvey.fileName,
                    isCloudSurvey: extSurvey.isCloud,
                    syncTime: extSurvey.syncTime
                }))
            else {
                errorHandler(extSurvey.status)
                dispatch(updateSetting('loader', { visible: false }))
            }
        }
        catch (er) {
            dispatch(updateSetting('loader', { visible: false }))
        }
    }

    return (
        <View style={{ ...androidStyle.TopBar, ...styles.mainView, paddingTop: options.headerStatusBarHeight }}>
            <StatusBar
                animated={true}
                backgroundColor={'transparent'}
                translucent={true}
                barStyle='light-content' />
            <Icon pack='cp' name='logo-text' style={styles.logo} fill={'#fff'} />
            <View style={styles.icons}>
                <SingleIconButton
                    color='#fff'
                    iconName='folder'
                    onPress={openSurveyHandler} />
                <SingleIconButton
                    color='#fff'
                    iconName='plus'
                    onPress={navigateToCreate} />
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: primary,
        paddingVertical: 3
    },
    icons: {
        flexDirection: 'row'
    },
    logo: {
        width: 100,
        height: 30,
    }
})