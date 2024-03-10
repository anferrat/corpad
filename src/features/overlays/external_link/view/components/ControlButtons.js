import React from 'react'
import { View, StyleSheet } from 'react-native'
import { activity, plusCircle, search } from '../../../../../components/Icons'
import { Button, Icon, ListItem, Text } from '@ui-kitten/components'
import { primary } from '../../../../../styles/colors'

const ControlButtons = ({ loading, goToFindInSurvey, isSurveyLoaded, addToSurvey, isCreating }) => {
    if (!isSurveyLoaded && !loading)
        return (
            <View>
                <Text
                    style={styles.hint}
                    category='s2'
                    appearance='hint'>
                    To save the data from this label, please open an existing survey or create a new one.
                </Text>
            </View>
        )
    else
        if (!loading)
            return (
                <View
                    style={styles.buttonView}>
                    <ListItem
                        style={styles.listItem}
                        onPress={addToSurvey}
                        title='Add to the survey'
                        description='Create new survey item with data from the label.'
                        disabled={loading || isCreating}
                        accessoryLeft={isCreating ? activity : (props) => <Icon {...props} fill={primary} name='plus-circle' />} />
                    <ListItem
                        title='Find in the survey'
                        description='Find item in the survey that matches data from the label.'
                        accessoryLeft={(props) => <Icon {...props} fill={primary} name='search' />}
                        disabled={loading || isCreating}
                        onPress={goToFindInSurvey}
                    />

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
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 0
    },
    listItem: {
        minHeight: 70
    },
    hint: {
        textAlign: 'center',
        margin: 12
    }
})