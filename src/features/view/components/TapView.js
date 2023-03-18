import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import InputWithTitle from './InputWithTitle'
import Select from '../../../components/Select2'
import TextLine from './TextLine'
import { tapSettings, tapOptions } from '../../../constants/constants'
import { primary } from '../../../styles/colors'

const TapView = ({ tapValue, tapFine, tapCoarse, tapSetting, updateTap }) => {

    const updateTapValue = React.useCallback((value) => { updateTap(value, 'TAP_VALUE', 'tapValue') }, [updateTap])

    const updateTapCoarse = React.useCallback((value) => { updateTap(value, 'TAP_COARSE', 'tapCoarse') }, [updateTap])

    const updateTapFine = React.useCallback((value) => { updateTap(value, 'TAP_FINE', 'tapFine') }, [updateTap])

    switch (tapSetting) {
        case 0:
            return <View style={styles.mainView}>
                <Text style={styles.title} category='p2'>{tapSettings[tapSetting]}</Text>
                <View style={styles.selectFields}>
                    <Select
                        placeholderOption={true}
                        style={styles.select}
                        selectedIndex={tapCoarse}
                        itemList={tapOptions}
                        placeholder='#'
                        property='tapCoarse'
                        onSelect={updateTapCoarse} />
                    <Select
                        placeholderOption={true}
                        style={styles.select}
                        selectedIndex={tapFine}
                        itemList={tapOptions}
                        placeholder='#'
                        property='tapFine'
                        onSelect={updateTapFine} />
                </View>
            </View>
        case 1:
            return <InputWithTitle
                keyboardType='numeric'
                value={tapValue}
                onEndEditing={updateTapValue}
                valid={true}
                title={'VA'}
                property='tapValue'
                unit={'%'} />
        case 2:
            return <TextLine title='Control mode' value={tapSettings[tapSetting] ?? null} />
        default:
            return null
    }
}

export default TapView

const styles = StyleSheet.create({
    title: {
        textTransform: 'uppercase',
        color: primary,
        flex: .7
    },
    mainView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        justifyContent: 'space-between',
        paddingVertical: 6
    },
    selectFields: {
        flexDirection: 'row',
        flex: 1,
        flexBasis: 70,
        justifyContent: 'flex-end'
    },
    select: {
        flex: 1,
        paddingLeft: 6
    }
})