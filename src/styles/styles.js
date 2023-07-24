import { StyleSheet, Platform } from 'react-native'
import { basic200, basic300 } from './colors'

export const androidRipple = { color: basic200 }

export const globalStyle = StyleSheet.create({
    screen: {
        alignItems: 'stretch',
        flex: 1,
        backgroundColor: basic200,
        overflow: 'hidden',
    },
    card: Platform.select({
        ios: {
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            padding: 12,
            borderWidth: 1,
            borderRadius: 6,
            borderColor: basic300,
            margin: 6,
            marginTop: 12,
            backgroundColor: '#fff',
            overflow: 'hidden',
            zIndex: 1
        },
        android: {
            elevation: 3,
            padding: 12,
            borderRadius: 6,
            margin: 6,
            marginTop: 12,
            backgroundColor: '#fff',
            overflow: 'hidden',
            zIndex: 1
        },
        default: {
            padding: 12,
            borderRadius: 6,
            margin: 6,
            marginTop: 12,
            backgroundColor: '#fff',
            overflow: 'hidden',
            zIndex: 1
        }
    })
}) 