import React from 'react'
import { View, StyleSheet } from 'react-native'
import IconButton from '../../../../components/IconButton'
import { Button, Icon, Text } from '@ui-kitten/components'
import { basic } from '../../../../styles/colors'
import Input from '../../../../components/Input'
import WireView from './WireView'
import { WireGaugeLabels } from '../../../../constants/labels'
import { WireColorColors } from '../../../../styles/colors'



const AnodeBedAnodeView = ({ current, wireColor, wireGauge, index, deleteAnodeBedAnodeHandler, update, validate, valid, showModal }) => {
    const onDelete = React.useCallback(() => {
        deleteAnodeBedAnodeHandler(index)
    }, [deleteAnodeBedAnodeHandler, index])

    const onChangeText = React.useCallback((text) => {
        update(text, 'current', index)
    }, [update, index])

    const onEndEditing = React.useCallback(() => {
        validate('current', index)
    }, [validate, index])

    const showModalHandler = React.useCallback(() => {
        showModal(index)
    }, [index, showModal])

    const renderColorIcon = React.useCallback(() => <Icon
        style={styles.colorIcon}
        name={WireColorColors[wireColor].length === 2 ? 'color-circle-double' : 'color-circle'}
        pack='cp'
        fill={WireColorColors[wireColor][0]}
        fill2={WireColorColors[wireColor][1]} />, [wireColor])

    return (
        <View
            style={styles.container}>
            <View
                style={styles.titleRow}>
                <View
                    style={styles.titleView}>
                    <Button
                        accessoryLeft={wireColor != null ? renderColorIcon : null}
                        onPress={showModalHandler}
                        appearance='ghost'
                        size='small'
                        style={styles.label}>
                        {wireGauge === null ? 'Anode ' : null}#{index + 1}{wireGauge !== null ? ` (${WireGaugeLabels[wireGauge]})` : null}
                    </Button>
                    <Input
                        style={styles.input}
                        value={current}
                        valid={valid.current}
                        maxLength={8}
                        keyboardType='numeric'
                        unit={'A'}
                        property='current'
                        onChangeText={onChangeText}
                        onEndEditing={onEndEditing} />
                </View>
                <IconButton
                    iconName={'close'}
                    onPress={onDelete} />
            </View>
        </View>
    )
}

export default AnodeBedAnodeView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 25,
        height: 25
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        textAlignVertical: 'center'
    },
    input: {
        flex: 1,
        marginBottom: -12,
        marginRight: 12
    },
    label: {
        marginRight: 18,
        textAlignVertical: 'center',
        minWidth: 120,
        justifyContent: 'flex-start'
    },
    colorIcon: {
        width: 18,
        height: 18
    }
})