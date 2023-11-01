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
        subtitle: 'Streamline your cathodic protection data capture with ease using our offline-capable mobile app'
    },
    {
        backgroundColor: basic300,
        image: <Icon name='onboarding-create' pack='cp' fill={primary} style={styles.icon} />,
        title: 'Data capture',
        subtitle: ' Take photos, assign GPS coordinates, and plot data on the map with our user-friendly interface'
    },
    {
        backgroundColor: basic300,
        image: <Icon name='onboarding-calculator' pack='cp' fill={primary} style={styles.icon} />,
        title: 'Corrosion calculator',
        subtitle: `Quickly calculate cathodic protection values on the go for accurate data analysis`
    },
    {
        backgroundColor: basic300,
        image: <Icon name='onboarding-multimeter' fill={primary} pack='cp' style={styles.icon} />,
        title: 'Connect multimeter',
        subtitle: 'Seamlessly connect a Bluetooth multimeter to capture real-time data in the field'
    },
    {
        backgroundColor: basic300,
        image: <Icon name='onboarding-export' pack='cp' fill={primary} style={styles.icon} />,
        title: 'Efficient data dandling',
        subtitle: 'Easily import and export data with CSV and KML files and back up surveys to the cloud'
    }
]

// Shows after app update. U have to increase ONBOARDING_VERSION in app/configs/Onboarding in order to display these pages
export const lastVersionPages = [
    {
        backgroundColor: basic300,
        image: <Icon name='corpad-logo' fill={primary} pack='cp' style={styles.icon} />,
        title: 'Updated to version 1.4',
        subtitle: "We've enhanced your cathodic protection data capture experience. Explore our latest features and unlock premium capabilities with a subscription."
    },
    {
        backgroundColor: basic300,
        image: <Icon name='file-text' fill={primary} style={styles.icon} />,
        title: 'Capture more data',
        subtitle: 'Now you can capture images, import features from .kml and .gpx files, collect anode bed redings for rectifiers and soil resistivity readings for test points. Your survey capabilities just got even more powerful.'
    },
    {
        backgroundColor: basic300,
        image: <Icon name='pricetags' fill={primary} style={styles.icon} />,
        title: 'Unlock premium features',
        subtitle: 'Upgrade to our subscription plan to access advanced features and make the most out of your data capture experience. Enjoy exclusive benefits and enhanced functionality.'
    },
    {
        backgroundColor: basic300,
        image: <Icon name='smiling-face' fill={primary} style={styles.icon} />,
        title: "Don't miss out",
        subtitle: "We're committed to delivering ongoing improvements and updates. Stay tuned for future enhancements and new features that will further streamline your fieldwork."
    },
]




