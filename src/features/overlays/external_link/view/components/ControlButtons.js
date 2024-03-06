import React from 'react'
import { View, StyleSheet } from 'react-native'
import { activity, plusCircle, search } from '../../../../../components/Icons'
import { Button, Text } from '@ui-kitten/components'


const ControlButtons = ({ loading, goToFindInSurvey, isSurveyLoaded, addToSurvey, isCreating }) => {
    if (!isSurveyLoaded && !loading)
        return (
            <View>
                <Text
                    style={styles.hint}
                    category='s2'
                    appearance='hint'>
                    To save the data from this link, please open an existing survey or create a new one.
                </Text>
            </View>
        )
    else
        if (!loading)
            return (
                <View
                    style={styles.buttonView}>
                    <Button
                        onPress={addToSurvey}
                        disabled={loading || isCreating}
                        style={styles.button}
                        accessoryLeft={isCreating ? activity : plusCircle}>
                        Add to the survey
                    </Button>
                    <Button
                        disabled={loading || isCreating}
                        onPress={goToFindInSurvey}
                        style={styles.button}
                        appearance='outline'
                        accessoryLeft={search}>
                        Find in the survey
                    </Button>
                </View>
            )
        else
            return null
}

export default ControlButtons

const styles = StyleSheet.create({
    buttonView: {
        width: '100%',
        minHeight: 50,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: 12
    },
    button: {
        paddingHorizontal: 6,
        marginBottom: 12,
        width: '100%'
    },
    hint: {
        textAlign: 'center'
    }
})