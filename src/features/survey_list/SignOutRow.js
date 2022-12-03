import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { Text, Button, Icon } from '@ui-kitten/components'
import { signOut } from '../../api/cloud_drive/auth'
import { loadSession } from '../../store/actions/settings'
import { primary, danger } from '../../styles/colors'
import { gdrive } from '../../api/cloud_drive/gd'

const SignOutRow = () => {
    const userName = useSelector(state => state.settings.session.userName)
    const signing = useSelector(state => state.settings.session.signing)
    const dispatch = useDispatch()

    const signOutHandler = React.useCallback(async () => {
        dispatch(loadSession({ signing: true }))
        const signOutRequest = await signOut()
        if (signOutRequest.status === 200) {
            dispatch(loadSession({ signing: false, isSigned: false, userName: null }))
            gdrive.accessToken = null
        }
        else errorHandler(signOutRequest.status)
    }, [dispatch])

    return (
        <View style={styles.signRow}>
            <View style={styles.userName}>
                <Icon style={styles.icon} name='person' fill={primary} />
                <Text category='p2' appearance='hint'>Signed as {userName}</Text>
            </View>
            <Button
                accessoryLeft={signing ? <ActivityIndicator color={danger} /> : null}
                onPress={!signing ? signOutHandler : null}
                appearance='ghost'
                status={'danger'}
                size='small'>{!signing ? 'Log out' : null}</Button>
        </View>
    )
}

export default React.memo(SignOutRow)

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
        flexDirection: 'row',
        alignItems: 'center'
    }
})
