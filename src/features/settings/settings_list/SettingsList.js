import React from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { Text } from '@ui-kitten/components'
import ListItem from './components/ListItemSettings'
import { loadSettings, updateSetting } from '../../../store/actions/settings'
import { warningHandler } from '../../../helpers/error_handler'
import { resetSurvey } from '../../../api/database/index'

const settingsParams = [
    {
        title: 'Survey',
        settings: [
            { title: 'Survey information', screen: 'info', icon: 'info-outline', description: 'See general stats of your survey, and status of completion' },
            { title: 'Reference cells', screen: 'refCells', icon: 'RE', pack: 'cp', description: 'Add and remove portable reference cells' },
            { title: 'Potentials', screen: 'potentials', icon: 'grid-outline', description: 'Control default units for potential readings, add and remove potential reading types' },
            { title: 'Export to spreadsheet', screen: 'export', icon: 'download', description: 'Export data from survey to a spreadsheet file and save it to your device' },
        ]
    },
    {
        title: 'App',
        settings: [
            { title: 'Default names', screen: 'defaultNames', icon: 'people-outline', description: 'Manage default names for new test points, rectifiers, readings and etc.' },
            { title: 'Exported files', screen: 'exportedFiles', icon: 'file-text-outline', description: 'View exported CSV and KML files, delete or share them with different apps' },
        ],
    }
]





const SettingsList = (props) => {
    const dispatch = useDispatch()
    const emergencyExit = async () => {
        const confirm = await warningHandler(12, 'Exit', 'Cancel')
        if (confirm) {
            dispatch(updateSetting('loader', { visible: true, title: 'Exiting' }))
            await resetSurvey()
            dispatch(loadSettings({
                loader: { visible: false, title: null, text: null },
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
                title='Exit without saving'
                subtitle='Exit to the main screen. All changes made after last sync will not be saved in file. Use with caution.'
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