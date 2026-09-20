import React, { useState } from 'react'
import { Input, Text, Popover, Icon } from '@ui-kitten/components'
import { basic200 } from '../styles/colors'
import { primary, basic } from '../styles/colors'
import { View, StyleSheet, Pressable, Platform } from 'react-native'
import { translate } from '../localization'
import { fieldProperties } from '../constants/fieldProperties'

const InvalidPropertyCaptionLabels = Object.freeze({
    name: ['validation.name', 'Name must only contain following characters: A-z, 0-9, -._() and be less than 40 characters'],
    latitude: ['validation.latitude', 'Must be between -90 and +90'],
    longitude: ['validation.longitude', 'Must be between -180 and +180'],
    number: ['validation.number', 'Must be a number'],
    positiveNumber: ['validation.positiveNumber', 'Must be a positive number'],
    tapValue: ['validation.percentage', 'Must be a number between 0 and 100 %'],
    smallText: ['validation.smallText', 'Must be less than 80 characters'],
    largeText: ['validation.largeText', 'Must be less than 300 characters']
})

const getCaption = type => translate(...InvalidPropertyCaptionLabels[type])

const getPropertyCaption = (property) => {
    switch (property) {
        case 'name':
            return getCaption('name')
        case 'latitude':
            return getCaption('latitude')
        case 'longitude':
            return getCaption('longitude')
        case 'comment':
            return getCaption('largeText')
        case 'model':
        case 'licenseNumber':
        case 'serialNumber':
            return getCaption('smallText')
        case 'tapValue':
            return getCaption('tapValue')
        case 'shunt':
        case 'current':
        case 'voltage':
        case 'area':
        case 'potential':
        case 'voltageDrop':
        case 'maxVoltage':
        case 'maxCurrent':
            return getCaption('number')
        case 'potentialAc':
            return getCaption('positiveNumber')
        default: return null
    }
}

//Unit component sets unit inside input field. If value is text just outupts text. it can be also an object :
/* {
main: 'mV', 
position: 2, // where super or sub text starts, if not specified adds at the end
format: 'super' // 'super' or 'sub'. sub to default
script: '2' //super or sub formatted text string
}
*/

const toString = (value) => value === null || value === undefined ? '' : value.toString()

const UnitText = (props) => {
    const { children, disabled } = props
    if (disabled)
        return <Text appearance='hint' status='basic' {...props}>{children}</Text>
    else return <Text status='primary' {...props}>{children}</Text>
}

export const Unit = (props) => {
    if (props.unit) {
        if (typeof props.unit === 'string')
            return <UnitText style={styles.unitMain} disabled={props.disabled}>{props.unit}</UnitText>

        else {
            const mainStart = props.unit?.position ? props.unit.main.substr(0, props.unit.position) : props.unit.main
            const mainEnd = props.unit?.position ? props.unit.main.substr(props.unit.position) : ''
            return (
                <View style={props.unit.format === 'super' ? styles.mainViewSuper : styles.mainViewSub}>
                    <UnitText style={styles.unitMain} disabled={props.disabled}>
                        {mainStart}
                    </UnitText>
                    <UnitText style={styles.unitScript} disabled={props.disabled}>
                        {props.unit.script}
                    </UnitText>
                    <UnitText style={styles.unitMain} disabled={props.disabled}>
                        {mainEnd}
                    </UnitText>
                </View>
            )
        }
    }
    else return null
}


const InputField = React.forwardRef((props, ref) => {
    const { onChangeText: onChange, unit, disabled, displayHint, hintIcon, hintTitle } = props

    const renderCaption = React.useCallback(() => {
        if (!props.valid) {
            const caption = getPropertyCaption(props.property)
            if (caption)
                return (
                    <View>
                        <Text
                            category='label'
                            status='danger'>
                            {caption}
                        </Text>
                    </View>
                )
            else return null
        }
        else return null
    }, [props.valid, props.property])

    const styleObject = React.useMemo(() => ({ ...props.style, paddingBottom: 12, borderWidth: props.disabled ? 0 : 1 }), [props.style, props.disabled])
    const value = React.useMemo(() => toString(props.value), [props.value])
    const fieldProperty = fieldProperties[props.property]
    const label = fieldProperty?.label ?? props.label
    const placeholder = props.placeholder ?? fieldProperty?.placeholder
    const accessory = React.useCallback(() => <>
        <Unit unit={unit} disabled={disabled} />
        <InfoHint displayHint={displayHint} icon={hintIcon} title={hintTitle} />
    </>, [unit, disabled, displayHint, hintIcon, hintTitle])

    const onChangeText = React.useCallback((text) => !onChange ? null : onChange(text === '' ? null : text), [onChange])

    return (
        <Input
            caption={renderCaption}
            accessoryRight={accessory}
            {...props}
            label={label}
            placeholder={placeholder}
            keyboardType={props.keyboardType !== 'numeric' ? props.keyboardType : Platform.select({
                android: 'numeric',
                ios: 'numbers-and-punctuation',
                macos: 'numbers-and-punctuation',
                default: 'numeric'
            })}
            onChangeText={onChangeText}
            ref={ref}
            selectTextOnFocus={true}
            value={value}
            style={styleObject}
            status={props.valid ? 'basic' : 'danger'}
        />
    )
})

export default InputField

// InfoHint - adds an pressable item to input field to view additional info. Used to display info about reference cells in potentials entry fields

const InfoHint = (props) => {
    const [visible, setVisible] = useState(false)

    const renderHint = React.useCallback(() => {
        return <Pressable
            onPress={setVisible.bind(this, true)}
            style={styles.hint}>
            <Icon pack='cp'
                name={props.icon}
                style={styles.hintIcon}
                fill={primary} />
        </Pressable>
    }, [props.icon])
    if (props.displayHint)
        return (
            <Popover
                placement='top'
                style={styles.popover}
                visible={visible}
                anchor={renderHint}
                onBackdropPress={setVisible.bind(this, false)} >
                <View style={styles.hintView}>
                    <Icon pack='cp' name={props.icon} style={styles.largeIcon} fill={primary} />
                    <Text status='primary' category='p2'>{props.title}</Text>
                </View>
            </Popover >
        )
    else return null
}



const styles = StyleSheet.create({
    unitMain: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    mainViewSuper: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    mainViewSub: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    unitScript: {
        marginLeft: 2,
        fontSize: 8,
        fontWeight: 'bold'
    },
    hintIcon: {
        width: 15,
        height: 15,
        marginHorizontal: 4
    },
    largeIcon: {
        width: 18,
        height: 18,
        marginHorizontal: 4
    },
    hint: {
        flexDirection: 'row',
        backgroundColor: basic200,
        borderRadius: 6,
        padding: 5,
        marginLeft: 8,
        alignItems: 'center',
        maxWidth: 40,
    },
    popover: {
        backgroundColor: 'rgba(0,0,0,0)',
        borderWidth: 0,
        padding: 3
    },
    hintView: {
        backgroundColor: 'white',
        paddingHorizontal: 5,
        paddingVertical: 3,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: basic,
        borderRadius: 6
    }
})
