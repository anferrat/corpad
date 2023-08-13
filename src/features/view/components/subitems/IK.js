import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Toggle, Text } from '@ui-kitten/components'
import Input from '../../../../components/Input'
import Header from '../Header'
import Divider from '../Divider'
import TextLine from '../../../../components/TextLine'
import SidesDisplay from '../SidesDisplay'
import { isEqualIK } from '../../helpers/comparators'
import { IsolationShortedLabels, IsolationTypeLabels } from '../../../../constants/labels'
import { IsolationShorted } from '../../../../constants/global'

const IK = ({ data, updateShorted, updatePropertyValue, validateCurrent, onEdit, idMap, subitemIndex }) => {
    const { name, type, current, fromAtoB, isolationType, shorted, sideA, sideB, valid } = data
    const currentValue = valid.current && current !== null ? current + ' A' : null

    const onToggle = React.useCallback((value) => updateShorted(value, subitemIndex, data), [data])

    const onChangeCurrent = React.useCallback((value) => updatePropertyValue(value, subitemIndex, 'current'), [subitemIndex, updatePropertyValue])

    const onEndEditingCurrent = React.useCallback(() => validateCurrent(subitemIndex, data), [data, subitemIndex])

    return (
        <>
            <Header
                title={name}
                icon={type}
                onEdit={onEdit} />
            <Divider visible={true} />
            <SidesDisplay
                value={currentValue}
                fromAtoB={fromAtoB}
                shorted={shorted}
                idMap={idMap}
                sideA={sideA}
                sideB={sideB} />
            <Divider visible={true} />
            <TextLine title='Isolation type' value={IsolationTypeLabels[isolationType] ?? null} />
            <View style={styles.shortedView}>
                <Toggle
                    style={styles.toggle}
                    status={shorted ? 'danger' : 'primary'}
                    checked={Boolean(shorted)}
                    title='Shorted'
                    onChange={onToggle}>
                    <Text>{IsolationShortedLabels[IsolationShorted.SHORTED]}</Text>
                </Toggle>
                {shorted ?
                    <View style={styles.input}>
                        <Input
                            onChangeText={onChangeCurrent}
                            onEndEditing={onEndEditingCurrent}
                            keyboardType='numeric'
                            value={current}
                            valid={valid.current}
                            property='current'
                            label='Current'
                            unit={'A'} />
                    </View> :
                    null}
            </View>
        </>
    )
}
export default React.memo(IK, isEqualIK)

const styles = StyleSheet.create({
    shortedView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 12,
    },
    input: {
        marginLeft: 24,
        flex: 1
    },
    toggle: {
        height: 80
    }
})
