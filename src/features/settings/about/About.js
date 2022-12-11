import React from 'react'
import { View, StyleSheet, Linking } from 'react-native'
import { Icon, Text, Divider, ListItem } from '@ui-kitten/components'
import { version } from '../../../../App'
import { primary } from '../../../styles/colors'
import { globalStyle } from '../../../styles/styles'
import { ScrollView } from 'react-native-gesture-handler'

const About = (props) => {
    const linkedin = (props) => <Icon {...props} name='linkedin' />
    const linkHandler = (link) => Linking.openURL(link)
    return (
        <ScrollView >
            <View style={{ ...globalStyle.card, ...styles.card }}>
                <View style={styles.logoView}>
                    <Icon name='corpad-logo' pack='cp' style={styles.logo} fill={primary} />
                    <Text category='s2' appearance='hint' style={styles.text}>Corpad for Android. {`\n`}Version {version}</Text >

                </View>
                <Divider />
                <View style={styles.listView}>
                    <ListItem title={'Privacy policy'} onPress={linkHandler.bind(this, 'https://www.corpad.ca/legal/privacy-policy')} />
                    <ListItem title={'Terms and conditions'} onPress={linkHandler.bind(this, 'https://www.corpad.ca/legal/terms-and-conditions')} />
                    <ListItem title={'Licenses'} onPress={props.navigateToLicenses} />
                </View>
                <ListItem title={'Support'} description='andrei@corpad.ca' onPress={linkHandler.bind(this, 'mailto:andrei@corpad.ca')} />
                <ListItem title={'Created by'} description='Andrei Lomtev' accessoryRight={linkedin} onPress={linkHandler.bind(this, 'https://www.linkedin.com/in/andrei-lomtev/')} />
            </View>
        </ScrollView>
    )
}

export default About

const styles = StyleSheet.create({
    mainView: {
        flex: 1
    },
    logo: {
        width: 120,
        height: 120
    },
    logoView: {
        flex: .5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 12
    },
    listView: {
        paddingTop: 12,
        flex: 1
    },
    card: {
        paddingHorizontal: 0,
        marginBottom: 12
    },
    text: {
        textAlign: 'center'
    }
})