import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Icon, Text, ListItem } from '@ui-kitten/components'
import { success, primary } from '../../../../styles/colors'
import { person } from '../../../../components/Icons'

const accessory = (props) => <Icon
    {...props}
    fill={success}
    name='checkmark' />

const SignedView = ({ userName, onSignOut, signing }) => {
    return (
        <>
            <Icon
                style={styles.icon}
                fill={primary}
                name='cloud'
                pack='cp' />
            <Text
                category={'h6'}
                style={styles.title}>
                Cloud storage
            </Text>
            <ListItem
                title={userName}
                accessoryLeft={person}
                description='Google Drive'
                accessoryRight={accessory} />
            <Button
                disabled={signing}
                style={styles.signOutButton}
                onPress={onSignOut}
                status={'danger'}
                appearance='ghost'>
                Log out
            </Button>
        </>
    )
}

export default SignedView



const styles = StyleSheet.create({
    icon: {
        width: 50,
        height: 50,
        marginTop: 12
    },
    signOutButton: {
        width: '100%',
        height: 60
    },
    title: {
        marginBottom: 12
    }
})