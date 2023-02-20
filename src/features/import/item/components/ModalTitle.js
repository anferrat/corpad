import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import IconButton from '../../../../components/IconButton'


const ModalTitle = ({ hideModal, title, icon, iconFill }) => {
    return (
        <View style={styles.header}>
            <View style={styles.title}>
                <Icon name={icon} style={styles.icon} fill={iconFill} />
                <Text category='h6'>{title}</Text>
            </View>
            {!hideModal ? null :
                <IconButton
                    iconName='close'
                    onPress={hideModal} />}
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        width: 25,
        height: 25,
        marginRight: 12
    },
    header: {
        paddingTop: 0,
        paddingBottom: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default ModalTitle