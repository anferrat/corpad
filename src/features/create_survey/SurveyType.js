import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import OptionCard from './components/OptionCard'


const SurveyType = (props) => {
    const isSigned = useSelector(state => state.settings.session.isSigned)
    return (
        <View style={styles.mainView}>
            <OptionCard
                isCloudValue={false}
                onPress={props.setIsCloud}
                icon='smartphone'
                title='Device-based'
                subtitle={`Survey is stored on your device inside app folder. Doesn't require internet.`}
                selected={!props.isCloud} />
            <OptionCard
                isCloudValue={true}
                disabled={!isSigned}
                hint={!isSigned ? '(Sign in required)' : null}
                onPress={props.setIsCloud}
                icon='cloud'
                pack='cp'
                title='Cloud-based'
                subtitle='Survey is stored on your device, but also synced with your cloud storage. Requires internet and Google account.'
                selected={props.isCloud} />
        </View>
    )
}

export default React.memo(SurveyType)

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        marginTop: 24,
    }
})
