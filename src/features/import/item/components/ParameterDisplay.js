import React from 'react'
import { Icon } from '@ui-kitten/components'
import SelectField from '../../../../components/Select'
import InputField from '../../../../components/Input'
import DefaultBadge from './DeafultNameBadge'
import { basic, basic200 } from '../../../../styles/colors'
import { emptyValueCheck } from '../helpers/functions'

const ParameterDisplay = (props) => {
    const accessories = React.useMemo(() => props.fieldList.map(
        () => <Icon name='file-text-outline'
            fill={basic}
            style={styles.accessoryIcon} />), [props.fieldList.length])

    switch (props.parameterType) {
        case 0:
            switch (props.importType) {
                case 0:
                case 2:
                    {
                        const value = (props.importType === 2) ?
                            `${props.defaultName} <index>` :
                            emptyValueCheck(props.defaultValue)
                        return <InputField
                            accessoryLeft={props.importType === 2 ? DefaultBadge : null}
                            disabled={true}
                            valid={true}
                            label={props.label}
                            style={props.importType === 2 ? styles.inputDefaultName : styles.input}
                            value={value} />
                    }
                case 1:
                    return <SelectField
                        valid={true}
                        style={styles.select}
                        placeholder={props.placeholder}
                        label={props.label}
                        accessoryList={accessories}
                        property={props.property}
                        selectAction={props.onSelect}
                        itemsList={props.fieldList}
                        selectedItem={props.fieldIndex} />
                default:
                    return null
            }
        case 1:
            {
                const selectdIndex = props.importType === 0 ? props.defaultValue : props.fieldIndex
                const list = props.importType === 0 ? props.itemList : props.fieldList
                const accessoryList = props.importType === 0 ? undefined : accessories
                return <SelectField
                    valid={true}
                    style={styles.select}
                    disabled={true}
                    placeholder={selectdIndex === null ? '<Empty>' : null}
                    label={props.label}
                    accessoryList={accessoryList}
                    property={props.property}
                    selectAction={props.onSelect}
                    itemsList={list}
                    selectedItem={selectdIndex} />
            }

        default: return null
    }
    if (props.importType === 0)
        return <InputField
            disabled={true}
            valid={true}
            label={props.label}
            style={{ ...props.style, ...styles.input }}
            value={emptyValueCheck(props.defaultValue)} />
    else if (props.importType === 1)
        return <SelectField
            valid={true}
            style={props.style}
            placeholder={props.placeholder}
            label={props.label}
            accessoryList={accessories}
            property={props.property}
            selectAction={props.onSelect}
            itemsList={props.fieldList}
            selectedItem={props.fieldIndex} />
    else if (props.importType === 2 && props.property === 'name' && props.defaultName !== null)
        return <InputField
            accessoryLeft={DefaultBadge}
            disabled={true}
            valid={true}
            label={props.label}
            style={{ ...props.style, marginBottom: -12 }}
            value={`${props.defaultName} <index>`} />
    else return null
}

export default ParameterDisplay

const styles = {
    accessoryIcon: {
        width: 20,
        height: 20
    },
    input: {
        marginBottom: -12,
        backgroundColor: basic200,
        flex: 1
    },
    inputDefaultName: {
        marginBottom: -12,
        flex: 1
    },
    select: {
        flex: 1
    }
}