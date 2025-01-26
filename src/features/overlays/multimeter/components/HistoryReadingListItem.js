import React, { useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { ListItem, Text } from '@ui-kitten/components'
import { CurrentUnits, MultimeterReadingTypes, PotentialUnits } from '../../../../constants/global'
import { CurrentUnitLabels, MultimeterTypeLabels, PotentialUnitLabels } from '../../../../constants/labels'
import { getFormattedDate } from '../../../../helpers/functions'
import IconButton from '../../../../components/IconButton'
import { basic400, danger } from '../../../../styles/colors'
import { globalStyle } from '../../../../styles/styles'
import { copyToClipboard } from '../../../../native_libs/clipboard'


const getValue = (value, flag) => {
    return flag === null ? roundValue(value) : flag
}

const getUnit = (type, unit, isAc) => {
    const suffix = isAc === null ? '' : (isAc ? 'AC' : 'DC')
    switch (type) {
        case MultimeterReadingTypes.CURRENT:
            return CurrentUnitLabels[unit] + suffix
        case MultimeterReadingTypes.VOLTAGE:
            return PotentialUnitLabels[unit] + suffix
    }
}

const roundValue = (value, unit, type) => {
    const param = unit === PotentialUnits.MILIVOLTS && type === MultimeterReadingTypes.VOLTAGE ? 1 : 3
    return value!== null ? value.toFixed(param) : ''
}

const HistoryReadingListItem = ({ reading, onDeletePress }) => {
    const { id, value, type, isAc, deviceType, deviceTimestamp, flag, unit } = reading
    const onDeleteHandler = useCallback(() => onDeletePress(id), [onDeletePress, id])

    const renderAccessory = useCallback(() => <IconButton
        iconName='trash-2'
        color={danger}
        onPress={onDeleteHandler}
    />, [onDeleteHandler])
    const val = `${getValue(value, flag)} ${getUnit(type, unit, isAc)}`

    const onPressHandler = useCallback(() => copyToClipboard(val), [val])

    return (
        <ListItem
            onLongPress={onPressHandler}
            style={styles.listItem}
            title={val}
            description={`${getFormattedDate(deviceTimestamp)} | ${MultimeterTypeLabels[deviceType]}`}
            accessoryRight={renderAccessory} />
    )
}


export default React.memo(HistoryReadingListItem)

const styles = StyleSheet.create({
    listItem: {
        height: 70,
        borderWidth: 1,
        borderColor: basic400,
        marginBottom: 12,
        marginHorizontal: 6,
        borderRadius: 10
    },
})