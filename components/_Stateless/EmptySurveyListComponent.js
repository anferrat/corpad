import React from 'react'
import { Text, Icon, Button } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import { basic, basic200 } from '../../styles/GlobalStyle'


const EmptySurveyListComponent = (props) => {
    const getCaptions = (listType) => {
        switch (listType) {
            case 'LOCAL':
                return ({
                    title: 'Oops... No files!',
                    text: `You don't have any survey files. You can create new survey or choose one from your device or cloud storage.`,
                    buttonShown: true,
                    iconName: 'book-open',
                    pack: null
                })
            case 'CLOUD':
                return ({
                    title: 'Oops... No files!',
                    text: `Your cloud folder is empty. Create new survey and choose cloud location for survey to appear here, or move a copy of survey from your device.`,
                    buttonShown: true,
                    iconName: 'cloud',
                    pack: 'cp'
                })
        }
    }

    const captions = getCaptions(props.listType)
    return (
        <View style={styles.mainView}>
            <Icon style={styles.icon} fill={basic} name={captions.iconName} pack={captions.pack} />
            <Text category='h3' appearance={'hint'} style={styles.title}>{captions.title}</Text>
            <Text category='p1' appearance={'hint'} style={styles.title}>{captions.text}</Text>
            {captions.buttonShown ?
                <Button appearance='ghost' size='large' onPress={props.onButtonPress}>Create new survey</Button>
                : null}
        </View>
    )
}

export default React.memo(EmptySurveyListComponent)

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
        textAlign: 'center'
    },
    icon: {
        width: 80,
        height: 80,
    }
})