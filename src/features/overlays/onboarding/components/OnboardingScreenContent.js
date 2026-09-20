import React from "react"
import { Icon } from "@ui-kitten/components"
import { primary, basic300 } from "../../../../styles/colors"
import { translateOverlay } from '../../../../localization'

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
        title: translateOverlay('onboarding.welcomeTitle'),
        subtitle: translateOverlay('onboarding.welcomeSubtitle')
    },
    {
        backgroundColor: basic300,
        image: <Icon name='onboarding-create' pack='cp' fill={primary} style={styles.icon} />,
        title: translateOverlay('onboarding.dataCaptureTitle'),
        subtitle: translateOverlay('onboarding.dataCaptureSubtitle')
    },
    {
        backgroundColor: basic300,
        image: <Icon name='onboarding-calculator' pack='cp' fill={primary} style={styles.icon} />,
        title: translateOverlay('onboarding.calculatorTitle'),
        subtitle: translateOverlay('onboarding.calculatorSubtitle')
    },
    {
        backgroundColor: basic300,
        image: <Icon name='onboarding-multimeter' fill={primary} pack='cp' style={styles.icon} />,
        title: translateOverlay('onboarding.multimeterTitle'),
        subtitle: translateOverlay('onboarding.multimeterSubtitle')
    },
    {
        backgroundColor: basic300,
        image: <Icon name='onboarding-export' pack='cp' fill={primary} style={styles.icon} />,
        title: translateOverlay('onboarding.dataHandlingTitle'),
        subtitle: translateOverlay('onboarding.dataHandlingSubtitle')
    }
]

// Shows after app update. U have to increase ONBOARDING_VERSION in app/configs/Onboarding in order to display these pages
export const getLastVersionPages = () => [
    {
        backgroundColor: basic300,
        image: <Icon name='corpad-logo' fill={primary} pack='cp' style={styles.icon} />,
        title: translateOverlay('onboarding.updatedTitle', { version: '1.6.4' }),
        subtitle: translateOverlay('onboarding.updatedSubtitle')
    },
    {
        backgroundColor: basic300,
        image: <Icon name='shopping-cart' fill={primary} style={styles.icon} />,
        title: translateOverlay('onboarding.freeTitle'),
        subtitle: translateOverlay('onboarding.freeSubtitle')
    },
    {
        backgroundColor: basic300,
        image: <Icon name='calculator' fill={primary} style={styles.icon} pack='cp' />,
        title: translateOverlay('onboarding.improvementsTitle'),
        subtitle: translateOverlay('onboarding.improvementsSubtitle')
    },

    {
        backgroundColor: basic300,
        image: <Icon name='smiling-face' fill={primary} style={styles.icon} />,
        title: translateOverlay('onboarding.dontMissTitle'),
        subtitle: translateOverlay('onboarding.dontMissSubtitle')
    },
]




