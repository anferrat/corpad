import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import ListItem from '../_Stateless/ListItemSettings'
import { Text } from '@ui-kitten/components'
import { useDispatch } from 'react-redux'
import { loadSettings } from '../../store/actions/settings'
import { warningHandler } from '../errorHandler'
import { resetSurvey } from '../../database/db'

const settingsParams = [
    {
        title: 'Survey',
        settings: [
            { title: 'Survey information', screen: 'info', icon: 'info-outline', description: 'See general stats of your survey, and status of completion' },
            { title: 'Reference cells', screen: 'refCells', icon: 'RE', pack: 'cp', description: 'Add and remove portable reference cells' },
            { title: 'Potentials', screen: 'potentials', icon: 'grid-outline', description: 'Control default units for potential readings, add and remove potential reading types' },
        ]
    },
    {
        title: 'App',
        settings: [
            { title: 'Default names', screen: 'defaultNames', icon: 'people-outline', description: 'Manage default names for new test points, rectifiers, readings and etc.' },
            { title: 'Export as CSV', screen: 'export', icon: 'file-text-outline', description: 'Export data from survey to a spreadsheet file and save it to your device' },
        ],
    }
]





const SettingsList = (props) => {
    const dispatch = useDispatch()
    const emergencyExit = async () => {
        const confirm = await warningHandler(12, 'Exit', 'Cancel')
        if (confirm) {
            resetSurvey()
            dispatch(loadSettings({
                currentSurvey: {
                    name: null,
                    fileName: null,
                    isLoaded: false,
                    isCloudSurvey: null,
                    savingInProgress: false,
                    lastSyncTime: null
                }
            }))
        }
    }
    return (
        <ScrollView style={styles.mainView} contentContainerStyle={styles.container}>
            {settingsParams.map(section => (
                <React.Fragment key={section.title}>
                    <Text style={styles.title} appearance='hint'>{section.title}</Text>
                    {section.settings.map(setting =>
                        <ListItem
                            pack={setting?.pack}
                            iconName={setting.icon}
                            key={setting.title + setting.screen}
                            title={setting.title}
                            subtitle={setting.description}
                            onPress={props.navigateToDetails.bind(this, setting.screen)} />)}
                </React.Fragment>))}
            <Text style={styles.title} appearance='hint'>Other</Text>
            <ListItem
                iconName='log-out'
                title='Emergency exit'
                subtitle='Exit to the main screen without saving changes to the file'
                onPress={emergencyExit}
            />
        </ScrollView>
    )
}

export default SettingsList

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#fff'
    },
    container: {
        paddingVertical: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft: 12,
        paddingVertical: 6
    }
})