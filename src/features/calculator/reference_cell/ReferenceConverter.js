import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon } from '@ui-kitten/components'
import fieldValidation from '../../../helpers/validation'
import InputDataField from './InputDataField'
import SelectDataField from './SelectDataField'
import { primary } from '../../../styles/colors'

export const referenceCellElectrodes = ['Cu/CuSO4(sat)', 'Hg/HgCl2/KCl(sat)', 'Ag/AgCl/sea water', 'Ag/AgCl/KCl(sat)', 'Ag/AgCl/3.5M KCl', 'Ag/AgCl/3M KCl', 'Ag/AgCl/1M KCl', 'Ag/AgCl/0.6M KCl', 'Zn', 'H']
export const referenceCellNames = ['Copper/Copper sulfate', 'Saturated calomel', 'Silver/Silver chloride', 'Silver/Silver chloride', 'Silver/Silver chloride', 'Silver/Silver chloride', 'Silver/Silver chloride', 'Silver/Silver chloride', 'Zinc', 'Standard hydrogen']
export const referenceCellCodes = ['CSE', 'SCE', 'SSC', 'SSC', 'SSC', 'SSC', 'SSC', 'SSC', 'ZRE', 'SHE']
export const referenceCellValues = [0.316, 0.244, 0.266, 0.199, 0.205, 0.210, 0.235, 0.250, -0.8, 0]

const ReferenceConverter = (props) => {

    //const referenceCellTemperatureCoefficients = [0.9, -0.76, -0.33, -0.7, -0.7, -0.67, -0.5, -0.48, +0.871] need to find good data source
    const refCellList = React.useMemo(() => referenceCellElectrodes.map((rc, i) => `${rc} - ${referenceCellNames[i]}`), [])

    const setValue = React.useCallback((property, value) => {
        props.setData(old => ({ ...old, calculator: { ...old.calculator, given: { ...old.calculator.given, [property]: value } } }))
    }, [props.setData])

    const setValid = React.useCallback((property, value) => {
        const validation = fieldValidation(value, property, true)
        props.setValid(old => ({ ...old, [property]: validation.valid }))
        if (validation.valid)
            setValue(property, validation.value)
    }, [props.setValid, setValue])

    const selectAction = React.useCallback((property, value) => {
        setValue(property, value)
        props.setValid(old => ({ ...old, [property]: value !== null }))
    }, [props.setValid, setValue])

    const potentialUnit = React.useMemo(() => (
        {
            main: 'mV',
            script: referenceCellCodes[props.data.initialType] ?? '',
            format: 'sub'
        }
    ), [props.data.initialType])

    return (
        <>
            <View style={styles.selectRow}>
                <SelectDataField
                    style={styles.select}
                    disabled={props.disabled}
                    valid={props.valid.initialType}
                    label={'Base reference type'}
                    placeholder={'Select reference type'}
                    property={'initialType'}
                    selectedIndex={props.data.initialType}
                    itemList={refCellList}
                    onSelect={selectAction} />
                <Icon name='arrow-forward-outline' fill={primary} style={styles.icon} />
                <SelectDataField
                    style={styles.select}
                    disabled={props.disabled}
                    valid={props.valid.targetType}
                    label={'Target reference type'}
                    placeholder={'Select reference type'}
                    property={'targetType'}
                    selectedIndex={props.data.targetType}
                    itemList={refCellList}
                    onSelect={selectAction} />
            </View>
            <InputDataField
                disabled={props.disabled}
                property={'potential'}
                setValue={setValue}
                setValid={setValid}
                label='Base potential reading'
                value={props.data.potential}
                valid={props.valid.potential}
                unit={potentialUnit}
            />
        </>
    )
}

export default ReferenceConverter

const styles = StyleSheet.create({
    selectRow: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingBottom: 16
    },
    select: {
        flex: 1,
    },
    icon: {
        width: 25,
        height: 25,
        marginHorizontal: 6,
        marginTop: 18,
    }
})