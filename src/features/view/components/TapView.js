import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import InputWithTitle from './InputWithTitle'
import Select from '../../../components/Select'
import TextLine from './TextLine'
import { CoarseFineOptionLabels, TapOptionLabels } from '../../../constants/labels'
import { TapOptions, CoarseFineOptions } from '../../../constants/global'
import { primary } from '../../../styles/colors'

const coarseFineOptions = Object.values(CoarseFineOptions).map(option => ({ item: CoarseFineOptionLabels[option], index: option }))

const TapView = ({ tapValue, tapFine, tapCoarse, tapSetting, submit, update, valid }) => {

    const onChangeTapValue = React.useCallback((value) => { update(value, 'tapValue') }, [update])

    const submitTapValue = () => submit(tapValue, 'tapValue')

    const submitTapCoarse = (value) => submit(value, 'tapCoarse')

    const submitTapFine = (value) => submit(value, 'tapFine')

    switch (tapSetting) {
        case TapOptions.COARSE_FINE:
            return <View style={styles.mainView}>
                <Text style={styles.title} category='s1' numberOfLines={1} ellipsizeMode={'tail'}>{TapOptionLabels[tapSetting]}</Text>
                <View style={styles.selectFields}>
                    <Select
                        placeholderOption={true}
                        style={styles.select}
                        selectedIndex={tapCoarse}
                        itemList={coarseFineOptions}
                        placeholder='#'
                        property='tapCoarse'
                        onSelect={submitTapCoarse} />
                    <Select
                        placeholderOption={true}
                        style={styles.select}
                        selectedIndex={tapFine}
                        itemList={coarseFineOptions}
                        placeholder='#'
                        property='tapFine'
                        onSelect={submitTapFine} />
                </View>
            </View>
        case TapOptions.RESISTOR:
            return <InputWithTitle
                keyboardType='numeric'
                value={tapValue}
                onEndEditing={submitTapValue}
                onChangeText={onChangeTapValue}
                valid={valid.tapValue}
                title={'VA'}
                property='tapValue'
                unit={'%'} />
        case TapOptions.AUTO:
            return <TextLine title='Control mode' value={TapOptionLabels[tapSetting] ?? null} />
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