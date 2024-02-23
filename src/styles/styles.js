import { StyleSheet, Platform } from 'react-native'
import { basic200, basic300, primary400 } from './colors'
import { StrokeWidths } from '../constants/global'

export const androidRipple = { color: basic200 }

export const pressable = StyleSheet.create({
    pressed: Platform.select({
        android: {

        },
        default: {
            backgroundColor: basic200
        }
    }),
    pressedPrimary: Platform.select({
        android: {},
        default: {
            backgroundColor: primary400
        }
    })
})

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

export const StrokeWidthValues = Object.freeze({
    [StrokeWidths._05PT]: 1,
    [StrokeWidths._1PT]: 2,
    [StrokeWidths._1_5PT]: 3,
    [StrokeWidths._2PT]: 4,
    [StrokeWidths._3PT]: 6,
})