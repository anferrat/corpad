import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import IconButton from '../../../../components/IconButton'


const ModalTitle = ({ hideModal, disabled }) => {
    return (
        <View style={styles.title}>
            <Text category='h6' style={styles.titleText}>Import .csv</Text>
            {disabled ? null :
                <IconButton
                    disabled={disabled}
                    iconName='close'
                    onPress={hideModal} />}
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 6,
        paddingTop: 12

    },
    titleText: {
        flex: 1,
    },
})

export default ModalTitle