import React from 'react'
import { StyleSheet, View } from 'react-native'
import ToggleToken from '../../../../components/ToggleToken'
import { MultimeterModeIcons } from '../constants/constants'
import { MultimeterModeLabels } from '../../../../constants/labels'

const getIcon = (mode, inProgress) => inProgress ? { icon: 'activity', pack: null } : MultimeterModeIcons[mode] ?? { icon: 'question-mark-circle-outline', pack: null }

const ModeToken = ({ selected, onSelect, mode, disabled, inProgress }) => {
    const onPress = () => !selected ? onSelect(mode) : null
    const { icon, pack } = getIcon(mode, inProgress)
    const title = MultimeterModeLabels[mode] ?? 'Error'
    return (
        <View
            style={styles.container}>
            <ToggleToken
                checked={selected}
                title={title}
                onPress={onPress}
                icon={icon}
                pack={pack}
                disabled={disabled}
            />
        </View>
    )
}


export default React.memo(ModeToken)

const styles = StyleSheet.create({
    container: {
        minWidth: 180,
        justifyContent: 'center',
        height: 60
    },
})