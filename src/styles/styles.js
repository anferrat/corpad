import { StyleSheet } from 'react-native'
import { basic200 } from './colors'

export const androidRipple = { color: basic200 }

export const globalStyle = StyleSheet.create({
    screen: {
        alignItems: 'stretch',
        flex: 1,
        backgroundColor: basic200,
        overflow: 'hidden',
    },
    card: {
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
        padding: 12,
        borderWidth: 0,
        borderRadius: 6,
        margin: 6,
        marginTop: 12,
        backgroundColor: '#fff',
        overflow: 'hidden',
    }
}) 