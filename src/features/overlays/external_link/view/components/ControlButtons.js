import React from 'react'
import { View, StyleSheet } from 'react-native'
import { activity, plusCircle, search } from '../../../../../components/Icons'
import { Button, Icon, ListItem, Text } from '@ui-kitten/components'
import { primary } from '../../../../../styles/colors'
import { translateOverlay } from '../../../../../localization'

const ControlButtons = ({ loading, goToFindInSurvey, isSurveyLoaded, addToSurvey, isCreating }) => {
    if (!isSurveyLoaded && !loading)
        return (
            <View>
                <Text
                    style={styles.hint}
                    category='s2'
                    appearance='hint'>
                    {translateOverlay('externalLink.noSurveyHint')}
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
                        title={translateOverlay('externalLink.addToSurvey')}
                        description={translateOverlay('externalLink.createItemDescription')}
                        disabled={loading || isCreating}
                        accessoryLeft={isCreating ? activity : (props) => <Icon {...props} fill={primary} name='plus-circle' />} />
                    <ListItem
                        style={styles.listItem}
                        title={translateOverlay('externalLink.findInSurvey')}
                        description={translateOverlay('externalLink.findItemDescription')}
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
