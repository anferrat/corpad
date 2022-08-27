import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View } from 'react-native'
import { styles } from './ExportSurvey'
import { circuitProperties } from "./exportFunctions"
import MultiSelectField from "../../_Stateless/MultiSelect"
import { Icon, CheckBox } from '@ui-kitten/components'
import { basic } from '../../../styles/GlobalStyle'
import { setExportCircuitsChecked } from '../../../store/actions/exportSurvey'

const renderIcon = (name) => <Icon pack='cp' name={name} style={styles.selectIcon} fill={basic} />

const CircuitProperties = (props) => {
    const dispatch = useDispatch()
    const visible = useSelector(state => state.exportSurvey.itemType === 'RECTIFIER')
    const circuitsChecked = useSelector(state => state.exportSurvey.circuitsChecked)
    const selectedCircuitReadings = useSelector(state => state.exportSurvey.selectedCircuitReadings)

    const circuitsItemList = React.useMemo(() => circuitProperties.map((_, i) => i), [])
    const circuitsDisplayList = React.useMemo(() => circuitProperties.map(p => p.label), [])
    const circuitsAccessoryList = React.useMemo(() => circuitProperties.map((reading) => renderIcon(reading.cardType, 'cp')), [])

    const onCircuitsCheckHandler = React.useCallback((value) => dispatch(setExportCircuitsChecked(value)), [])

    return (
        <View style={visible ? styles.item : styles.hidden}>
            <CheckBox
                status='primary'
                style={styles.checkBox}
                checked={circuitsChecked}
                onChange={onCircuitsCheckHandler}>
                Circuits
            </CheckBox>
            <View style={circuitsChecked ? styles.item : styles.hidden}>
                <MultiSelectField
                    disabled={!circuitsChecked}
                    style={styles.select}
                    placeholder='Select circuit readings'
                    selectedItems={selectedCircuitReadings}
                    onSelect={props.updateSetting.bind(this, 'selectedCircuitReadings')}
                    itemsList={circuitsItemList}
                    accessoryList={circuitsAccessoryList}
                    displayList={circuitsDisplayList} />
            </View>
        </View>
    )
}

export default React.memo(CircuitProperties)