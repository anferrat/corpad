import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setImportItemPropertyFieldIndex } from '../../store/actions/importData'
import { basic } from '../../styles/GlobalStyle'
import SelectField from '../_Stateless/SelectField'
import { Icon } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import SingleIconButton from '../_Stateless/SingleIconButton'
import { useNavigation } from '@react-navigation/native'
import { Input } from '../../models/importData'
import InputDisplay from '../_Stateless/ImportCSV/InputDisplay'
import { fieldProperties } from '../../constants/fieldProperties'

// it is actually select field that works for input field properties

const ImportItemInputField = (props) => {
    const navigation = useNavigation()
    const navigateToParameters = React.useCallback(() => navigation.navigate('ImportParameters', { property: props.property, subitemIndex: props.subitemIndex }), [props.subitemIndex, props.property])
    const isItem = props.subitemIndex === null || !props.subitemIndex
    const itemsList = useSelector(state => state.importData.fields)
    const data = useSelector(state => isItem ? state.importData.item[props.property] : new Input())
    const defaultName = useSelector(state => {
        if (isItem && props.property === 'name')
            return state.importData.defaultNames.find((n) => n.type === state.importData.itemType).name
        else if (!isItem && props.property === 'name')
            return state.importData.defaultNames.find((n) => n.type === state.importData.subitems[props.subitemIndex].subitemType).name
        else return null
    })
    const dispatch = useDispatch()
    const onSelectHandler = React.useCallback((selectedIndex) => dispatch(setImportItemPropertyFieldIndex(props.property, selectedIndex)), [props.property])

    return (
        <View style={{ ...props.style, ...styles.mainView }}>
            <InputDisplay
                {...data}
                defaultName={defaultName}
                style={styles.select}
                placeholder={fieldProperties[props.property].placeholder}
                label={fieldProperties[props.property].label}
                property={props.property}
                onSelect={onSelectHandler}
                itemsList={itemsList}
            />
            <SingleIconButton
                style={styles.button}
                size='small'
                iconName='options-2-outline'
                onPress={navigateToParameters}
            />
        </View>
    )
}
export default React.memo(ImportItemInputField)

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingBottom: 12

    },
    button: {
        marginTop: 20,
        marginLeft: 6
    },
    select: {
        flex: 1
    }
})