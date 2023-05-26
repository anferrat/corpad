import React from 'react'
import { View, StyleSheet } from 'react-native'
import Input from './Input'
import Select from './Select'
import { TapOptions, CoarseFineOptions } from '../../../../constants/global'
import { CoarseFineOptionLabels, TapOptionLabels } from '../../../../constants/labels'

const tapOptionList = Object.values(TapOptions).map(option => ({ item: TapOptionLabels[option], index: option }))

const coarseFineOptionList = Object.values(CoarseFineOptions).map(option => ({ item: CoarseFineOptionLabels[option], index: option }))

const RectifierTapSetting = ({ update, validate, tapSetting, tapCoarse, tapFine, tapValue, tapValueValid, updateTap }) => {
    return (
        <>
            <Select
                style={styles.select}
                placeholderOption={true}
                update={updateTap}
                label='Current control'
                property='tapSetting'
                selectedIndex={tapSetting}
                itemList={tapOptionList}
                placeholder='Select control mode' />
            {
                tapSetting === 0 ? (
                    <View style={styles.row}>
                        <Select
                            placeholderOption={true}
                            update={update}
                            style={styles.leftItem}
                            label='Coarse'
                            property='tapCoarse'
                            selectedIndex={tapCoarse}
                            itemList={coarseFineOptionList}
                            placeholder='#' />
                        <Select
                            placeholderOption={true}
                            update={update}
                            style={styles.rightItem}
                            label='Fine'
                            property='tapFine'
                            selectedIndex={tapFine}
                            itemList={coarseFineOptionList}
                            placeholder='#' />
                    </View>
                ) :
                    tapSetting === 1 ? (
                        <Input
                            update={update}
                            validate={validate}
                            property='tapValue'
                            maxLength={8}
                            label='Percentage'
                            placeholder='##'
                            keyboardType='numeric'
                            value={tapValue}
                            valid={tapValueValid}
                            unit='%' />
                    ) :
                        null
            }
        </>
    )
}

export default React.memo(RectifierTapSetting)

const styles = StyleSheet.create({
    select: {
        paddingVertical: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 12
    },
    leftItem: {
        flex: 1,
        paddingRight: 6
    },
    rightItem: {
        flex: 1,
        paddingLeft: 6
    }
})