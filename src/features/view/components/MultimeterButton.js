import React, { useCallback } from 'react'
import { PulseIndicator } from 'react-native-indicators'
import { View, StyleSheet } from 'react-native'
import { basic, basic200, basic300, primary, success, warning } from '../../../styles/colors'
import IconButton from '../../../components/IconButton'
import { hapticMedium } from '../../../native_libs/haptics'


const MultimeterButton = ({ isVisible, isSelected, isLoading, onPress }) => {
    const onPressHaptic = useCallback(() => {
        hapticMedium()
        onPress()
    }, [onPress])
    if (!isVisible)
        return null
    return <View
        style={styles.button}>
        {isSelected && isLoading ?
            <PulseIndicator
                color={primary}
                size={40} /> :
            (isSelected && !isLoading ?
                <IconButton
                    iconName={'checkmark'}
                    style={styles.selected}
                    onPress={onPressHaptic}
                    color={primary}
                /> :
                <IconButton
                    onPress={onPressHaptic}
                    iconName={'radio'} />
            )
        }
    </View>
}


export default React.memo(MultimeterButton)

const styles = StyleSheet.create({
    button: {
        marginBottom: 12,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selected: {
        backgroundColor: basic200,
    }
})