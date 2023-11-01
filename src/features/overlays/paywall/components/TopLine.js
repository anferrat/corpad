import React from 'react'
import { View, StyleSheet } from 'react-native'
import IconButton from '../../../../components/IconButton'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const TopLine = ({ onClose }) => {
    const { top } = useSafeAreaInsets()
    return (
        <View style={{ ...styles.container, top: top }}>
            <IconButton
                iconName='close'
                onPress={onClose}
                size='large' />
        </View>
    )
}

export default TopLine

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 12,
    },
})