import React from 'react'
import { View, StyleSheet } from 'react-native'
import Input from './Input'
import Select from './Select'
import { TapOptions, CoarseFineOptions } from '../../../../constants/global'
import { CoarseFineOptionLabels, TapOptionLabels } from '../../../../constants/labels'
import { translateEdit } from '../../../../localization'

const RectifierTapSetting = ({ update, validate, tapSetting, tapCoarse, tapFine, tapValue, tapValueValid, updateTap }) => {
    const tapOptionList = React.useMemo(() => Object.values(TapOptions).map(option => ({ item: TapOptionLabels[option], index: option })), [])
    const coarseFineOptionList = React.useMemo(() => Object.values(CoarseFineOptions).map(option => ({ item: CoarseFineOptionLabels[option], index: option })), [])
    return (
        <>
            <Select
                style={styles.select}
                placeholderOption={true}
                update={updateTap}
                property='tapSetting'
                label={translateEdit('currentControl')}
                selectedIndex={tapSetting}
                itemList={tapOptionList}
                placeholder={translateEdit('selectControlMode')} />
            {
                tapSetting === 0 ? (
                    <View style={styles.row}>
                        <Select
                            placeholderOption={true}
                            update={update}
                            style={styles.leftItem}
                            property='tapCoarse'
                            selectedIndex={tapCoarse}
                            itemList={coarseFineOptionList}
                            placeholder='#' />
                        <Select
                            placeholderOption={true}
                            update={update}
                            style={styles.rightItem}
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
        paddingBottom: 12,
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
