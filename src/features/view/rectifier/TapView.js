import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Text } from '@ui-kitten/components'
import InputField from '../InputField'
import SelectField from '../SelectField'
import { updateViewProperty } from '../../../store/actions/item'
import TextLine from '../components/TextLine'
import { getValue } from '../../../helpers/functions'
import { tapSettings, tapOptions } from '../../../constants/constants'
import { primary } from '../../../styles/colors'

const TapView = (props) => {
    const tapValue = useSelector(state => state.item.view.tapValue)
    const tapFine = useSelector(state => state.item.view.tapFine)
    const tapCoarse = useSelector(state => state.item.view.tapCoarse)
    const dispatch = useDispatch()
    const setValue = React.useCallback((text) => dispatch(updateViewProperty(text, 'tapValue')), [dispatch])
    switch (props.tapSetting) {
        case 0:
            return <View style={styles.mainView}>
                <Text style={styles.title} category='p2'>{tapSettings[props.tapSetting]}</Text>
                <View style={styles.selectFields}>
                    <SelectField
                        style={styles.select}
                        dataType='RECTIFIER'
                        itemId={props.itemId}
                        selectedItem={tapCoarse}
                        itemsList={tapOptions}
                        placeholder='#'
                        property='tapCoarse' />
                    <SelectField
                        style={styles.select}
                        dataType='RECTIFIER'
                        itemId={props.itemId}
                        selectedItem={tapFine}
                        itemsList={tapOptions}
                        placeholder='#'
                        property='tapFine' />
                </View>
            </View>
        case 1:
            return <InputField
                dataTypeItem='RECTIFIER'
                dataTypeSubitem='RECTIFIER'
                keyboardType='numeric'
                itemId={props.itemId}
                subitemId={props.itemId}
                value={tapValue}
                setValue={setValue}
                title='VA'
                property='tapValue'
                unit={'%'} />
        case 2:
            return <TextLine title='Control mode' value={getValue(props.tapSetting, tapSettings)} hideEmpty />
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