import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { Text, Button, Icon } from '@ui-kitten/components'
import { primary, danger } from '../../../styles/colors'
import useGoogleDriveAuth from '../../../hooks/useGoogleDriveAuth'
import { translateSurveyList } from '../../../localization'

const SurveyFileListHeader = ({ isCloud }) => {
    const { signing, isSigned, userName, signOut } = useGoogleDriveAuth()
    if (isCloud && isSigned)
        return (
            <View style={styles.signRow}>
                <View style={styles.userName}>
                    <Icon
                        style={styles.icon}
                        name='person'
                        fill={primary} />
                    <Text
                        category='p2'
                        numberOfLines={1}
                        ellipsizeMode='head'
                        appearance='hint'>
                        {translateSurveyList('signedAs')} {userName}
                    </Text>
                </View>
                <Button
                    style={styles.button}
                    accessoryLeft={
                        signing ?
                            <ActivityIndicator color={danger} />
                            : null}
                    onPress={
                        !signing ?
                            signOut
                            : null}
                    appearance='ghost'
                    status={'danger'}
                    size='small'>
                    {!signing ?
                        translateSurveyList('logOut') :
                        null}
                </Button>
            </View>
        )
    else return null
}

export default React.memo(SurveyFileListHeader)

const styles = StyleSheet.create({
    signRow: {
        paddingHorizontal: 12,
        paddingTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 12
    },
    userName: {
        flex: 1,
        flexShrink: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        flex: 1,
        marginLeft: 36
    }
})
