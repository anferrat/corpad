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
        subtitle: 'Welcome to the new era of cathodic protection data collection'
    },
    {
        backgroundColor: basic300,
        image: <Icon name='onboarding-create' pack='cp' fill={primary} style={styles.icon} />,
        title: 'Data capture',
        subtitle: 'Take photos, assign GPS coordinates, and plot data on the map with our user-friendly interface'
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
        title: 'Efficient data handling',
        subtitle: 'Easily import and export data with CSV and KML files and back up surveys to the cloud'
    }
]

// Shows after app update. U have to increase ONBOARDING_VERSION in app/configs/Onboarding in order to display these pages
export const lastVersionPages = [
    {
        backgroundColor: basic300,
        image: <Icon name='corpad-logo' fill={primary} pack='cp' style={styles.icon} />,
        title: 'Updated to version 1.6.4',
        subtitle: "New version of the app was installed. We've enhanced your cathodic protection data capture experience."
    },
    {
        backgroundColor: basic300,
        image: <Icon name='shopping-cart' fill={primary} style={styles.icon} />,
        title: 'Free for all',
        subtitle: 'Enjoy all premium features for free. It includes assigning images to the test point, adding external .kml or .gpx data on the map, creating NFC and QR-code labels and connecting Bluetooth multimeter to collect readings.'
    },
    {
        backgroundColor: basic300,
        image: <Icon name='calculator' fill={primary} style={styles.icon} pack='cp' />,
        title: 'Calculator improvments',
        subtitle: 'Latitude and longitude can now be assigned to corrosion calculations and their markers will be displayed on the map.'
    },

    {
        backgroundColor: basic300,
        image: <Icon name='smiling-face' fill={primary} style={styles.icon} />,
        title: "Don't miss out",
        subtitle: "We're committed to delivering ongoing improvements and updates. Check docs.corpad.ca for more info about new features."
    },
]





