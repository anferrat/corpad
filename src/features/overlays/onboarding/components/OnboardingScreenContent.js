import React from "react"
import { Icon } from "@ui-kitten/components"
import { primary, basic300 } from "../../../../styles/colors"

const styles = { //dont use StyleSheet here
    icon: {
        width: 150,
        height: 150
    }
}
export const mainPages = [
    {
        backgroundColor: basic300,
        image: <Icon name='corpad-logo' fill={primary} pack='cp' style={styles.icon} />,
        title: 'Welcome to Corpad',
        subtitle: 'Application for corrosion professionals that allows you to create and manage pipeline surveys with your mobile device'
    },
    {
        backgroundColor: basic300,
        image: <Icon name='onboarding-create' pack='cp' fill={primary} style={styles.icon} />,
        title: 'Create',
        subtitle: 'Create new surveys "on the go" or import your data from spreadsheets'
    },
    {
        backgroundColor: basic300,
        image: <Icon name='onboarding-navigate' pack='cp' fill={primary} style={styles.icon} />,
        title: 'Navigate',
        subtitle: `Display test points on the map and import its location to other apps for navigation`
    },
    {
        backgroundColor: basic300,
        image: <Icon name='onboarding-calculator' fill={primary} pack='cp' style={styles.icon} />,
        title: 'Calculate',
        subtitle: 'Calculate resistivity, current and other properties with your phone. Save results or/and export them to spreadsheets.'
    },
    {
        backgroundColor: basic300,
        image: <Icon name='onboarding-export' pack='cp' fill={primary} style={styles.icon} />,
        title: 'Export',
        subtitle: 'Export your data to spreadsheets or store them as JSON files on your device and cloud storage'
    }
]

// Shows after app update. U have to increase ONBOARDING_VERSION in app/configs/Onboarding in order to display these pages
export const lastVersionPages = [
    {
        backgroundColor: basic300,
        image: <Icon name='corpad-logo' fill={primary} pack='cp' style={styles.icon} />,
        title: 'Updated to version 1.3',
        subtitle: 'Take a look at the fantastic features that are included in this update.'
    },
    {
        backgroundColor: basic300,
        image: <Icon name='radio' fill={primary} style={styles.icon} />,
        title: 'Digital multimeter',
        subtitle: 'Bluetooth multimeter support added. Multimeter can be used to capture potentials directly from the app. Find more at corpad.ca/multimeters'
    },
    {
        backgroundColor: basic300,
        image: <Icon name='options-2' fill={primary} style={styles.icon} />,
        title: 'Export .csv and map search re-worked',
        subtitle: 'Updated interface makes app faster and easier to use in field.'
    },
    {
        backgroundColor: basic300,
        image: <Icon name='smiling-face' fill={primary} style={styles.icon} />,
        title: 'Lots of small things',
        subtitle: 'Check https://www.corpad.ca/updates for more info. If you encounter a bug, having issues or have great ideas on how to improve this app, please let me know at andrei@corpad.ca.'
    },
]




