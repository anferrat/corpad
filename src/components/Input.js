import React, { useState } from 'react'
import { Input, Text, Popover, Icon } from '@ui-kitten/components'
import { basic200 } from '../styles/colors'
import { primary, basic } from '../styles/colors'
import { View, StyleSheet, Pressable } from 'react-native'

const InvalidPropertyCaptionLabels = Object.freeze({
    name: 'Name must only contain following characters: A-z, 0-9, -._() and be less than 40 characters',
    latitude: 'Must be between -90 and +90',
    longitude: 'Must be between -180 and +180',
    number: 'Must be a number',
    tapValue: 'Must be a number between 0 and 100 %',
    smallText: 'Must be less than 80 characters',
    largeText: 'Must be less than 300 characters'
})

const getPropertyCaption = (property) => {
    switch (property) {
        case 'name':
            return InvalidPropertyCaptionLabels.name
        case 'latitude':
            return InvalidPropertyCaptionLabels.latitude
        case 'longitude':
            return InvalidPropertyCaptionLabels.longitude
        case 'comment':
            return InvalidPropertyCaptionLabels.largeText
        case 'model':
        case 'licenseNumber':
        case 'serialNumber':
            return InvalidPropertyCaptionLabels.smallText
        case 'tapValue':
            return InvalidPropertyCaptionLabels.tapValue
        case 'shunt':
        case 'current':
        case 'voltage':
        case 'area':
        case 'potential':
        case 'voltageDrop':
        case 'maxVoltage':
        case 'maxCurrent':
            return InvalidPropertyCaptionLabels.number
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

    const renderCaption = React.useCallback(() => {
        if (!props.valid)
            return (
                <View>
                    <Text
                        category='label'
                        status='danger'>
                        {getPropertyCaption(props.property)}
                    </Text>
                </View>
            )
        else return null
    }, [props.valid, props.property])

    const styleObject = React.useMemo(() => ({ ...props.style, paddingBottom: 12, borderWidth: props.disabled ? 0 : 1 }), [props.style, props.disabled])
    const value = React.useMemo(() => toString(props.value), [props.value])
    const accessory = React.useMemo(() => <>
        <Unit unit={props.unit} disabled={props.disabled} />
        <InfoHint displayHint={props.displayHint} icon={props.hintIcon} title={props.hintTitle} />
    </>, [props.unit, props.disabled, props.displayHint, props.hintIcon, props.hintTitle])

    const onChangeText = React.useCallback((text) => !props.onChangeText ? null : props.onChangeText(text === '' ? null : text), [props.onChangeText])

    return (
        <Input
            caption={renderCaption}
            accessoryRight={accessory}
            {...props}
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
    }, [])
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