import React from 'react'
import { View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { styles } from './ExportSurvey'
import { cardProperties } from "./exportFunctions"
import { referenceCellCodes, testPointReadingsWithPotentials, labels } from "../../../constants/constants"
import MultiSelectField from "../../_Stateless/MultiSelect"
import SelectField from '../../_Stateless/SelectField'
import { Icon, CheckBox } from '@ui-kitten/components'
import { basic } from '../../../styles/GlobalStyle'
import { setExportPotentialsChecked, setExportReadingsChecked } from '../../../store/actions/exportSurvey'

const renderIcon = (name, pack) => <Icon pack={pack} name={name} style={styles.selectIcon} fill={basic} />

const CardProperties = (props) => {
    const dispatch = useDispatch()
    const visible = useSelector(state => state.exportSurvey.itemType === 'TEST_POINT')
    const potentialsChecked = useSelector(state => state.exportSurvey.potentialsChecked)
    const selectedReference = useSelector(state => state.exportSurvey.selectedReference)
    const selectedPotentialTypes = useSelector(state => state.exportSurvey.selectedPotentialTypes)
    const selectedPotentialReadings = useSelector(state => state.exportSurvey.selectedPotentialReadings)
    const selectedPipelines = useSelector(state => state.exportSurvey.selectedPipelines)
    const readingsChecked = useSelector(state => state.exportSurvey.readingsChecked)
    const selectedReadings = useSelector(state => state.exportSurvey.selectedReadings)

    const referenceCellAccessoryList = React.useMemo(() => props.extraData.referenceCellList.map(() => renderIcon('RE', 'cp')), [props.extraData])
    const potentialTypesAccessoryList = React.useMemo(() => props.extraData.potentialTypes.map(() => renderIcon('grid', null)), [props.extraData])
    const readingTypesAccessoryList = React.useMemo(() => testPointReadingsWithPotentials.map(type => renderIcon(type, 'cp')), [])
    const pipelinesAccessoryList = React.useMemo(() => props.extraData.pipelineList.map(() => renderIcon('PL', 'cp')), [props.extraData])
    const referenceCellList = React.useMemo(() => props.extraData.referenceCellList.map(rc => (rc.name + ' (' + referenceCellCodes[rc.rcType] + ')')), [props.extraData])
    const potentialReadingsList = React.useMemo(() => testPointReadingsWithPotentials.map(i => labels[i].label), [])
    const pipelineIdList = React.useMemo(() => props.extraData.pipelineList.map((_, p) => p), [props.extraData])
    const pipelineDisplayList = React.useMemo(() => props.extraData.pipelineList.map(p => p.name), [props.extraData])
    const potentialTypeList = React.useMemo(() => props.extraData.potentialTypes.map((_, t) => t), [props.extraData])
    const poetntalTypeDisplayList = React.useMemo(() => props.extraData.potentialTypes.map(t => t.name), [props.extraData])
    const pipelinesActive = React.useMemo(() => selectedPotentialReadings.indexOf('PL') !== -1 || selectedPotentialReadings.indexOf('RS') !== -1, [selectedPotentialReadings])
    const cardItemList = React.useMemo(() => cardProperties.map((_, i) => i), [])
    const cardAccessoryList = React.useMemo(() => cardProperties.map((reading) => renderIcon(reading.cardType, 'cp')), [])
    const cardDisplayList = React.useMemo(() => cardProperties.map(p => p.label), [])

    const onPotentialCheckHandler = React.useCallback((value) => dispatch(setExportPotentialsChecked(value)), [])
    const onReadingsCheckHandler = React.useCallback((value) => dispatch(setExportReadingsChecked(value)), [])

    return (
        <View style={visible ? styles.item : styles.hidden}>
            <CheckBox
                style={styles.checkBox}
                checked={potentialsChecked}
                onChange={onPotentialCheckHandler}>Potentials</CheckBox>
            <View style={potentialsChecked ? styles.item : styles.hidden}>
                <View style={props.extraData.referenceCellList.length === 1 ? styles.hidden : styles.item}>
                    <SelectField
                        disabled={!potentialsChecked}
                        placeholder='Select reference cell'
                        ignorePlaceholder={true}
                        style={styles.select}
                        label='Reference cell'
                        accessoryList={referenceCellAccessoryList}
                        selectedItem={selectedReference}
                        selectAction={props.updateSetting.bind(this, 'selectedReference')}
                        itemsList={referenceCellList} />
                </View>
                <MultiSelectField
                    disabled={!potentialsChecked}
                    style={styles.select}
                    label='Potentials'
                    placeholder='Select potential types'
                    selectedItems={selectedPotentialTypes}
                    onSelect={props.updateSetting.bind(this, 'selectedPotentialTypes')}
                    itemsList={potentialTypeList}
                    accessoryList={potentialTypesAccessoryList}
                    displayList={poetntalTypeDisplayList} />
                <MultiSelectField
                    disabled={!potentialsChecked}
                    accessoryList={readingTypesAccessoryList}
                    style={styles.select}
                    label='Reading types'
                    placeholder='Select types'
                    selectedItems={selectedPotentialReadings}
                    onSelect={props.updateSetting.bind(this, 'selectedPotentialReadings')}
                    itemsList={testPointReadingsWithPotentials}
                    displayList={potentialReadingsList} />
                <MultiSelectField
                    style={styles.select}
                    disabled={!(pipelinesActive && potentialsChecked)}
                    label='Pipelines'
                    caption={'Pipeline risers and test leads will be grouped together if assigned to same pipeline'}
                    placeholder='Select pipelines'
                    selectedItems={selectedPipelines}
                    onSelect={props.updateSetting.bind(this, 'selectedPipelines')}
                    accessoryList={pipelinesAccessoryList}
                    itemsList={pipelineIdList}
                    displayList={pipelineDisplayList} />
            </View>
            <CheckBox
                style={styles.checkBox}
                checked={readingsChecked}
                onChange={onReadingsCheckHandler}>Other readings</CheckBox>
            <View style={readingsChecked ? styles.item : styles.hidden}>
                <MultiSelectField
                    disabled={!readingsChecked}
                    style={styles.select}
                    label='Readings'
                    placeholder='Select readings'
                    selectedItems={selectedReadings}
                    onSelect={props.updateSetting.bind(this, 'selectedReadings')}
                    itemsList={cardItemList}
                    accessoryList={cardAccessoryList}
                    displayList={cardDisplayList} />
            </View>
        </View>
    )
}

export default React.memo(CardProperties)