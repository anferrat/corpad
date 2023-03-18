import React from 'react'
import { View, StyleSheet } from 'react-native'
import Input from './Input'
import Select from './Select'
import { tapSettings, tapOptions } from '../../../../constants/constants'


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
                itemList={tapSettings}
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
                            itemList={tapOptions}
                            placeholder='#' />
                        <Select
                            placeholderOption={true}
                            update={update}
                            style={styles.rightItem}
                            label='Fine'
                            property='tapFine'
                            selectedIndex={tapFine}
                            itemList={tapOptions}
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