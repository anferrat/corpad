import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { Text, Icon } from '@ui-kitten/components'
import { androidRipple } from '../../../styles/styles'
import { primary } from '../../../styles/colors'
import { useNavigation } from '@react-navigation/native'
import { hapticKeyboardPress } from '../../../native_libs/haptics'
import Pressable from '../../../components/Pressable'

const SurveyTitle = () => {
    const title = useSelector(state => state.settings.currentSurvey.name)
    const navigation = useNavigation()
    const navigateToSurveyOverview = () => {
        hapticKeyboardPress()
        navigation.navigate('SettingDetails', { setting: 'info' })
    }
    return (
        <View style={styles.pressableWrapper}>
            <Pressable onPress={navigateToSurveyOverview} android_ripple={androidRipple} style={styles.pressable}>
                <Icon
                    pack='cp'
                    name='corpad-logo'
                    style={styles.logo}
                    fill={primary} />
                <Text style={styles.title} category='h5' status='primary' numberOfLines={1} ellipsizeMode='tail'>{title}</Text>
            </Pressable>
        </View>
    )
}

export default SurveyTitle

const styles = StyleSheet.create({
    title: {
        flex: -1,
        fontWeight: 'bold',
        marginRight: 4
    },
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 6,
    },
    pressableWrapper: {
        flexDirection: 'row',
        overflow: 'hidden',
        borderRadius: 10,
    },
    logo: {
        height: 25,
        width: 25,
        marginRight: 6
    },
})