import React from 'react'
import { Text, Icon, Button } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import { basic, basic200 } from '../../../styles/colors'
import Pressable from '../../../components/Pressable'

const EmptySurveyFileListComponent = ({ isCloud, onCreate, initialLoad, onPressLink }) => {
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
                    category='p1'
                    appearance={'hint'}
                    style={styles.title}>
                    Create or open a survey file by tapping <Icon name='folder' style={styles.folderIcon} fill={basic} /> and selecting from your device or cloud storage.
                </Text>
                <View
                    style={styles.linkView}>
                    <Text
                        appearance='hint'>
                        New to Corpad? Check our documentation at </Text>
                    <Pressable
                        onPress={onPressLink}>
                        <Text
                            status='primary'>
                            docs.corpad.ca
                        </Text>
                    </Pressable>
                </View>
                <Button
                    appearance='ghost'
                    size='large'
                    onPress={onCreate.bind(this, false)}>
                    Create new survey
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
    },
    linkView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 24
    }
})