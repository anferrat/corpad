import React from 'react'
import { StyleSheet, View } from 'react-native'
import ToggleToken from '../../../../components/ToggleToken'
import { MultimeterRangeLabels } from '../../../../constants/labels'


const RangeToken = ({ range, onSelect, selected, disabled, inProgress }) => {
    const title = MultimeterRangeLabels[range] ?? 'Error'
    const onPress = () => !selected ? onSelect(range) : null
    return (
        <View
            style={styles.container}>
            <ToggleToken
                icon={inProgress ? 'activity' : null}
                checked={selected}
                title={title}
                onPress={onPress}
                disabled={disabled} />
        </View>
    )
}


export default React.memo(RangeToken)

const styles = StyleSheet.create({
    container: {
        minWidth: 120,
        justifyContent: 'center',
        height: 60
    },
})