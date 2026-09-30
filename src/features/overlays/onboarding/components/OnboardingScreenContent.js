import React from "react"
import { Icon } from "@ui-kitten/components"
import { primary, basic300 } from "../../../../styles/colors"
import { translateOnboardingScreen } from '../../../../localization'

const styles = { //dont use StyleSheet here
    icon: {
        width: 150,
        height: 150
    }
}
export const getMainPages = () => [
    {
        backgroundColor: basic300,
        image: <Icon name='corpad-logo' fill={primary} pack='cp' style={styles.icon} />,
        title: translateOnboardingScreen('main.screen1.title'),
        subtitle: translateOnboardingScreen('main.screen1.subtitle')
    },
    {
        backgroundColor: basic300,
        image: <Icon name='onboarding-create' pack='cp' fill={primary} style={styles.icon} />,
        title: translateOnboardingScreen('main.screen2.title'),
        subtitle: translateOnboardingScreen('main.screen2.subtitle')
    },
    {
        backgroundColor: basic300,
        image: <Icon name='onboarding-calculator' pack='cp' fill={primary} style={styles.icon} />,
        title: translateOnboardingScreen('main.screen3.title'),
        subtitle: translateOnboardingScreen('main.screen3.subtitle')
    },
    {
        backgroundColor: basic300,
        image: <Icon name='onboarding-multimeter' fill={primary} pack='cp' style={styles.icon} />,
        title: translateOnboardingScreen('main.screen4.title'),
        subtitle: translateOnboardingScreen('main.screen4.subtitle')
    },
    {
        backgroundColor: basic300,
        image: <Icon name='onboarding-export' pack='cp' fill={primary} style={styles.icon} />,
        title: translateOnboardingScreen('main.screen5.title'),
        subtitle: translateOnboardingScreen('main.screen5.subtitle')
    }
]

// Shows after app update. U have to increase ONBOARDING_VERSION in app/configs/Onboarding in order to display these pages
export const getLastVersionPages = () => [
    {
        backgroundColor: basic300,
        image: <Icon name='corpad-logo' fill={primary} pack='cp' style={styles.icon} />,
        title: translateOnboardingScreen('lastVersion.screen1.title', { version: '1.7' }),
        subtitle: translateOnboardingScreen('lastVersion.screen1.subtitle')
    },
    {
        backgroundColor: basic300,
        image: <Icon name='globe' fill={primary} style={styles.icon} />,
        title: translateOnboardingScreen('lastVersion.screen2.title'),
        subtitle: translateOnboardingScreen('lastVersion.screen2.subtitle')
    },

    {
        backgroundColor: basic300,
        image: <Icon name='smiling-face' fill={primary} style={styles.icon} />,
        title: translateOnboardingScreen('lastVersion.screen4.title'),
        subtitle: translateOnboardingScreen('lastVersion.screen4.subtitle')
    },
]




