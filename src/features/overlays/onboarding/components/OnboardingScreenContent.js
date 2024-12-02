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
        title: 'Updated to version 1.6',
        subtitle: "We've enhanced your cathodic protection data capture experience."
    },
    {
        backgroundColor: basic300,
        image: <Icon name='qr-code' fill={primary} pack='cp' style={styles.icon} />,
        title: 'QR code labels',
        subtitle: 'Test point and rectifier information can be stored inside a QR code. App users can read and use the data stored on the code.'
    },
    {
        backgroundColor: basic300,
        image: <Icon name='file-text' fill={primary} style={styles.icon} />,
        title: 'New format support',
        subtitle: 'Map layers now support .kmz, and .geojson. Import from spreadsheet works with .xlsx.'
    },
    {
        backgroundColor: basic300,
        image: <Icon name='funnel' fill={primary} style={styles.icon} />,
        title: 'New filters',
        subtitle: 'Test points can be filtered by pipeline. Added filters to markers on the map.'
    },
    {
        backgroundColor: basic300,
        image: <Icon name='smiling-face' fill={primary} style={styles.icon} />,
        title: "Don't miss out",
        subtitle: "We're committed to delivering ongoing improvements and updates. Stay tuned for future enhancements and new features that will further streamline your fieldwork."
    },
]




