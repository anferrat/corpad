import { Radio, RadioGroup, Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setImportItemSetting } from '../../../../store/actions/importData'
import Parameter from '../Parameter'

const RectifierSetting = () => {
    const setting = useSelector(state => state.importData.item.tapSetting)
    const dispatch = useDispatch()
    const setSetting = React.useCallback((value) => {
        if (value !== setting)
            dispatch(setImportItemSetting('tapSetting', value))
    }, [setting])

    return (
        <View>
            <Text appearance='hint' category='label'>Current control mode</Text>
            <RadioGroup
                style={styles.settingRow}
                selectedIndex={setting}
                onChange={setSetting}>
                <Radio>
                    Coarse - Fine
                </Radio>
                <Radio>
                    Value (VA %)
                </Radio>
            </RadioGroup>
            {
                setting ? <Parameter
                    property='tapValue' /> :
                    <View style={styles.row}>
                        <Parameter
                            style={styles.rowItem}
                            property='tapCoarse' />
                        <Parameter
                            style={styles.rowItem}
                            property='tapFine' />
                    </View>
            }
        </View>
    )
}

export default RectifierSetting

const styles = StyleSheet.create({
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    row: {
        flexDirection: 'row',
        marginHorizontal: -6,
    },
    rowItem: {
        flex: 1,
        marginHorizontal: 6,
    },
})
