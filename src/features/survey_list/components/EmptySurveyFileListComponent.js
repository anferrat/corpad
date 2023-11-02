import React from 'react'
import { Text, Icon, Button } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import { basic, basic200 } from '../../../styles/colors'

const EmptySurveyFileListComponent = ({ isCloud, onCreate, initialLoad }) => {
    if (initialLoad)
        return (
            <View style={styles.mainView}>

                <Icon
                    style={styles.icon}
                    fill={basic}
                    name={isCloud ? 'cloud' : 'file'}
                    pack={isCloud ? 'cp' : null} />
                <Text
                    category='h5'
                    appearance={'hint'}
                    style={styles.title}>
                    No survey files found
                </Text>
                <Text
                    category='p2'
                    appearance={'hint'}
                    style={styles.title}>
                    You don't have any survey files at the moment. You can either create a new survey or open an existing survey file by selecting <Icon name='folder' style={styles.folderIcon} fill={basic} /> and choosing a file from your device or cloud storage.
                </Text>
                <Button
                    appearance='ghost'
                    size='large'
                    onPress={onCreate.bind(this, false)}>
                    Create survey
                </Button>
                <Text
                    category='p2'
                    appearance={'hint'}>
                    or
                </Text>
                <Button
                    appearance='ghost'
                    size='large'
                    onPress={onCreate.bind(this, true)}>
                    Import survey from .csv
                </Button>
            </View>
        )
    else return null

}

export default React.memo(EmptySurveyFileListComponent)

const styles = StyleSheet.create({
    mainView: {
        ...StyleSheet.absoluteFill,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: basic200,
        padding: 12
    },
    title: {
        marginBottom: 20,
        marginTop: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 80,
        height: 80,
    },
    folderIcon: {
        width: 18,
        height: 18,
        marginHorizontal: 3,
        marginBottom: -4,
    }
})