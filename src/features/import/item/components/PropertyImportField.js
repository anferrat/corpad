import React from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { basic400, control, primary200, basic, warning } from '../../../../styles/colors'
import Badge from './Badge'
import FileBadge from './FileBadge'
import { fieldProperties } from '../../../../constants/fieldProperties'
import { getAccessory, getDisplayValue } from '../helpers/functions'
import ValuePreviewModal from './ValuePreviewModal'

const PropertyImportField = ({
    onPress,
    defaultValue,
    itemList,
    fieldIndex,
    importType,
    property,
    parameterType,
    fieldIndexList,
    defaultName,
    attributeCount,
    fields,
    data }) => {
    const propertyValues = fieldProperties[property]
    const displayValue = getDisplayValue(parameterType, importType, { itemList, defaultValue, fieldIndex, fieldIndexList, fields, defaultName })
    const accessory = getAccessory(parameterType, importType, propertyValues.accessoryList, defaultValue)
    const attributeMapCount = (parameterType === 1 && importType === 1 && !displayValue.empty) ? attributeCount : null
    const fileAccessoryDisplay = !displayValue.empty && (importType === 1 || importType === 3)
    if (propertyValues)
        return (
            <View>
                <Text appearance='hint' category='label'>{propertyValues.label}</Text>
                <View style={styles.pressableWrapper}>
                    <Pressable style={styles.pressable} onPress={onPress} android_ripple={{ color: primary200 }}>
                        <View style={styles.textViewWrapper}>
                            <View style={styles.textView}>
                                <Accessory
                                    accessory={accessory} />
                                <FileAccessory
                                    display={fileAccessoryDisplay} />
                                <Text
                                    appearance={displayValue.empty ? 'hint' : 'default'}
                                    numberOfLines={1}
                                    ellipsizeMode={'middle'}
                                    style={styles.value}>{displayValue.value}</Text>
                            </View>
                            <MapCounter
                                count={attributeMapCount} />
                        </View>
                        <View style={styles.badge}>
                            <BadgeComponent
                                data={data}
                                fields={fields}
                                fieldIndex={fieldIndex}
                                fieldIndexList={fieldIndexList}
                                empty={displayValue.empty}
                                importType={importType} />
                        </View>
                    </Pressable>
                </View>
            </View>
        )
    else return null
}

const FileAccessory = ({ display }) => {
    if (display)
        return (
            <Text appearance='hint' category='s2' style={styles.fileAccessory}>file:</Text>
        )
    else return null
}

const MapCounter = ({ count }) => {
    if (count !== null)
        return (
            <View style={{ ...styles.counterView, backgroundColor: count > 0 ? basic : warning }}>
                <Text style={styles.counterText} status='control' numberOfLines={1} ellipsizeMode={'tail'}>{count} mapped</Text>
            </View>
        )
    else return null
}

const Accessory = ({ accessory }) => {
    if (accessory)
        return (
            <Icon name={accessory.name} pack={accessory.pack} fill={accessory.fill} style={styles.icon} />
        )
    else
        return null
}

const BadgeComponent = ({ importType, empty, data, fields, fieldIndex, fieldIndexList }) => {
    if (empty)
        return null
    else
        if (importType === 1 || importType === 3)
            return (
                <ValuePreviewModal
                    data={data}
                    fields={fields}
                    fieldIndex={fieldIndex}
                    fieldIndexList={fieldIndexList}
                    importType={importType}
                />
            )
        else if (importType === 0)
            return <Badge title={'Fixed value'} />
        else if (importType === 2)
            return <Badge title={'Default name'} />
        else return null
}

export default React.memo(PropertyImportField)

const styles = StyleSheet.create({
    pressableWrapper: {
        overflow: 'hidden',
        borderRadius: 5,
        marginTop: 4,
    },
    pressable: {
        backgroundColor: control,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 45,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: basic400
    },
    badge: {
        flex: -1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    textView: {
        flex: -1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 18,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 9
    },
    counterView: {
        flex: -1,
        marginTop: 4,
        height: 14,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',

    },
    counterText: {
        fontSize: 9,
        paddingHorizontal: 4
    },
    textViewWrapper: {
        flexDirection: 'row',
        flex: -1,

    },
    value: {
        flex: -1,
        marginRight: 6,
    },
    fileAccessory: {
        marginRight: 6
    }
})