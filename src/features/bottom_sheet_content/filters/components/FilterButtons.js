import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from '@ui-kitten/components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useFilterApplyButton from '../hooks/useFilterApplyButton'


const FilterButtons = ({ resetVisible, applyVisible, onResetPress, closeSheet }) => {
    const insets = useSafeAreaInsets()
    
    const onApplyPress = useFilterApplyButton({ closeSheet })

    return <View
        style={{ ...styles.bottomBar, paddingBottom: insets.bottom + 12 }}>
        {resetVisible ?
            <Button
                style={styles.button}
                appearance='outline'
                onPress={onResetPress}>
                Clear filters
            </Button>
            : <View
                style={styles.button} />
        }
        {applyVisible ?
            <Button
                style={styles.button}
                onPress={onApplyPress}>
                Apply
            </Button>
            : null}
    </View>
}

export default FilterButtons


const styles = StyleSheet.create({
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        width: '100%'
    },
    button: {
        width: 125
    },
    buttonText: {
        fontWeight: 'bold',
        paddingHorizontal: 6,
    }
})