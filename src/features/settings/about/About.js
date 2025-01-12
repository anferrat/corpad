import React from 'react'
import { View, StyleSheet, Linking, Platform } from 'react-native'
import { Icon, Text, Divider, ListItem } from '@ui-kitten/components'
import { version } from '../../../../package.json'
import { primary } from '../../../styles/colors'
import { globalStyle } from '../../../styles/styles'
import { ScrollView } from 'react-native-gesture-handler'
import { errorHandler } from '../../../helpers/error_handler'
import SubscriptionView from './components/SubscriptionView'
import { openLink } from '../../../app/controllers/AppController'

const About = (props) => {
    const linkedin = (props) => <Icon {...props} name='linkedin' />
    const twitter = (props) => <Icon {...props} name='twitter' />
    const email = (props) => <Icon {...props} name='email' />
    const linkHandler = async (link) => {
        openLink({ url: link },
            er =>
                errorHandler(er))
    }
    return (
        <ScrollView >
            <View style={{ ...globalStyle.card, ...styles.card }}>
                <View style={styles.logoView}>
                    <Icon name='corpad-logo' pack='cp' style={styles.logo} fill={primary} />
                    <Text category='s2' appearance='hint' style={styles.text}>Corpad for {Platform.select({ ios: 'iOS', android: 'Android', macos: 'macOS', windows: 'Windows', web: 'Web', default: 'unknown' })}. {`\n`}Version {version}</Text >
                </View>
                <SubscriptionView />
                <Divider />
                <View style={styles.listView}>
                    <ListItem title={'Privacy policy'} onPress={linkHandler.bind(this, 'https://www.corpad.ca/legal/privacy-policy')} />
                    <ListItem title={'Terms and conditions'} onPress={linkHandler.bind(this, 'https://www.corpad.ca/legal/terms-and-conditions')} />
                    <ListItem title={'Licenses'} onPress={props.navigateToLicenses} />
                </View>
                <ListItem title={'Support'} description='andrei@corpad.ca' accessoryRight={email} onPress={linkHandler.bind(this, 'mailto:andrei@corpad.ca')} />
                <ListItem title={'Created by'} description='Andrei Lomtev' accessoryRight={linkedin} onPress={linkHandler.bind(this, 'https://www.linkedin.com/in/andrei-lomtev/')} />
                <ListItem title={'Follow on X'} description='@CorpadCorrosion' accessoryRight={twitter} onPress={linkHandler.bind(this, 'https://twitter.com/CorpadCorrosion')} />
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
        width: 110,
        height: 110,
        marginBottom: 12,
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