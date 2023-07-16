import React from 'react'
import { View, StyleSheet } from 'react-native'
import IconButton from '../../../../components/IconButton'
import { Icon, Text } from '@ui-kitten/components'
import { basic, primary } from '../../../../styles/colors'
import { MeasurementTypeLabels } from '../../../../constants/labels'


const ModalHeader = ({ onModalClose, measurementType }) => {
    return (
        <View style={styles.mainView}>
            <View style={styles.modeView}>
                <Icon
                    name={'radio'}
                    style={styles.icon}
                    fill={primary} />
                <View style={styles.labels}>
                    <Text
                        appearance='hint'
                        category='label'>
                        Mode
                    </Text>
                    <Text status='primary'
                        style={styles.mode}>
                        {MeasurementTypeLabels[measurementType] ?? ''}
                    </Text>
                </View>
            </View>
            <IconButton
                size='large'
                onPress={onModalClose}
                iconName={'close'}
            />
        </View>
    )
}

export default React.memo(ModalHeader)

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        marginBottom: 24,
        marginTop: 12,
        height: 60,
        alignItems: 'center',
    },
    icon: {
        width: 25,
        height: 25,
    },
    mode: {
        fontWeight: 'bold'
    },
    modeView: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 24
    },
    labels: {
        marginLeft: 18
    }
})