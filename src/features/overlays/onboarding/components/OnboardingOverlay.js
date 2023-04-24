import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import OnboardingOverlayWrapper from './OnboardingOverlayWrapper'
import { onboardingPoints } from '../helpers/constants'
import { control } from '../../../../styles/colors'


const OnboardingOverlay = ({ onboarding, icon, pack }) => {
    return (
        <OnboardingOverlayWrapper onboarding={onboarding}>
            <View style={styles.mainView}>
                <View style={styles.iconView}>
                    <Icon
                        name={icon}
                        pack={pack}
                        style={styles.mainIcon}
                        fill={control} />
                </View>
                {onboardingPoints[onboarding].map(point => (
                    <View
                        style={styles.pointView}
                        key={point}>
                        <Icon
                            name='bulb-outline'
                            style={styles.pointIcon}
                            fill={control} />
                        <Text
                            status={'control'}
                            style={styles.text}>
                            {point}
                        </Text>
                    </View>
                ))}
            </View>
            <Text
                status='control'
                category={'p1'}
                style={styles.hint}>
                Tap to continue
            </Text>
        </OnboardingOverlayWrapper>
    )
}

export default React.memo(OnboardingOverlay)

const styles = StyleSheet.create({
    mainView: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 36
    },
    hint: {
        position: 'absolute',
        bottom: 80,
        alignSelf: 'center'
    },
    pointView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 36,
        marginHorizontal: 12,
        width: '100%',
    },
    text: {
        flex: 1,
        fontSize: 18
    },
    iconView: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 70
    },
    pointIcon: {
        width: 25,
        height: 25,
        marginRight: 12
    },
    mainIcon: {
        width: 120,
        height: 120,
    }
})