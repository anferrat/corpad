import React, { useState, useEffect, useRef } from 'react'
import { IndexPath, Select, SelectItem, SelectGroup, CheckBox, Icon, Text } from '@ui-kitten/components'
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native'
import { labels } from '../../../constants/constants'
import { iconHandlerItem, titleHandlerItem } from '../../customFunctions'
import { sendRequest } from '../../../database/db'
import MainActionButton from '../../_Stateless/MainActionButton'
import InputField from '../../_Stateless/InputField'
import fieldValidation from '../../fieldValidation'
import { basic, basic300, primary } from '../../../styles/GlobalStyle'
import TopBarTitle from '../../_Stateless/TopBarTitle'
import { errorHandler } from '../../errorHandler'

const convertIndex = (index) => index.section * 3 + index.row

const renderIcon = (name) => (props) => <Icon {...props} pack='cp' name={name} fill={primary} />

//gotta split it up to smaller components


const DefaultNames = (props) => {
    const [selectedProperty, setSelectedProperty] = useState(new IndexPath(0, 0))

    const [defaultNames, setDefaultNames] = useState([])
    const [pipeNameAsDefault, setPipeNameAsDefault] = useState(false)
    const [defaultNameValue, setDefaultNameValue] = useState('')
    const [defaultNameValid, setDefaultNameValid] = useState(true)
    const initRender = useRef(true)
    const componentMounted = useRef(true)

    const nameIndex = React.useMemo(() => convertIndex(selectedProperty), [selectedProperty])
    const displayCheckBox = React.useMemo(() => (nameIndex === 3 || nameIndex === 7), [nameIndex]) // PL and RS cards 
    const options = React.useMemo(() => defaultNames.map(def => def.type), [defaultNames])
    const activeIconName = React.useMemo(() => nameIndex < 3 ? iconHandlerItem(defaultNames[nameIndex]?.type) : defaultNames[nameIndex]?.type, [defaultNames, nameIndex])
    const activeOptionName = React.useMemo(() => labels[defaultNames[nameIndex]?.type]?.label ?? titleHandlerItem(defaultNames[nameIndex]?.type), [defaultNames, nameIndex])
    const itemsList = React.useMemo(() => options.filter((_, i) => i < 3).map(o => <SelectItem key={'defaultName-' + o} title={titleHandlerItem(o)} accessoryLeft={renderIcon(iconHandlerItem(o))} />), [options])
    const subitemsList = React.useMemo(() => options.filter((_, i) => i > 2).map(o => <SelectItem key={'defaultName-' + o} title={labels[o].label} accessoryLeft={renderIcon(o)} />), [options])

    useEffect(() => {
        if (!initRender.current) {
            setDefaultNameValue(defaultNames[nameIndex]?.name)
            setDefaultNameValid(true)
        }
        else {
            initRender.current = false
        }
    }, [nameIndex, initRender])

    useEffect(() => {
        const fetchData = async () => {
            const defNamesFromDb = await sendRequest('SELECT', 'DEFAULT_NAMES', {})
            const settings = await sendRequest('SELECT', 'SETTINGS', {})
            if (defNamesFromDb.status == 200 && settings.status === 200) {
                if (componentMounted.current) {
                    setDefaultNames(defNamesFromDb.result)
                    setDefaultNameValue(defNamesFromDb.result[nameIndex].name)
                    setPipeNameAsDefault(settings.result.pipelineNameAsDefault)
                }
            }
            else
                errorHandler(622, props.goBack)
        }
        componentMounted.current = true
        fetchData()
        return () => {
            componentMounted.current = false
        }
    }, [])

    const onSaveHandler = React.useCallback(async () => {
        const updateDefaultNamesRequest = await sendRequest('UPDATE', 'DEFAULT_NAME', defaultNames)
        const updateSettingsRequest = await sendRequest('UPDATE', 'SETTING', { setting: 'pipelineNameAsDefault', value: pipeNameAsDefault ? 1 : 0 })
        if (updateDefaultNamesRequest.status === 200 && updateSettingsRequest.status === 200)
            props.goBack()
        else errorHandler(623)
    }, [defaultNames, props.goBack, pipeNameAsDefault])

    const nameChangeHandler = React.useCallback(() => {
        const validate = fieldValidation(defaultNameValue, 'name')
        setDefaultNameValid(validate.valid)
        if (validate.valid) {
            setDefaultNames(old => Object.assign([], old, {
                [nameIndex]: { ...old[nameIndex], name: defaultNameValue }
            }))
        }
    }, [nameIndex, defaultNameValue, setDefaultNames])

    const selectHandler = React.useCallback((index) => {
        setSelectedProperty(index)
    }, [setSelectedProperty])

    const checkboxHandler = React.useCallback((checked) => {
        setPipeNameAsDefault(checked)
    }, [setPipeNameAsDefault])

    if (defaultNames.length !== 0) {

        return (
            <>
                <ScrollView style={styles.mainView}>
                    <Select
                        label='Category'
                        accessoryLeft={renderIcon(activeIconName)}
                        selectedIndex={selectedProperty}
                        value={activeOptionName}
                        onSelect={selectHandler}>
                        <SelectGroup title='Survey items'>
                            {itemsList}
                        </SelectGroup>
                        <SelectGroup title='Readings'>
                            {subitemsList}
                        </SelectGroup>
                    </Select>
                    <InputField
                        property='name'
                        valid={defaultNameValid}
                        style={styles.input}
                        label='Default name prefix'
                        disabled={(displayCheckBox && !!pipeNameAsDefault)}
                        value={defaultNameValue}
                        onEndEditing={nameChangeHandler}
                        unit='<index>'
                        onChangeText={setDefaultNameValue} />
                    <View style={displayCheckBox ? styles.checkBox : styles.checkBoxHidden}>
                        <CheckBox
                            checked={!!pipeNameAsDefault}
                            onChange={checkboxHandler}>
                            Use pipeline name as default name for pipeline test leads and risers
                        </CheckBox>
                    </View>
                    <View style={styles.example}>
                        <TopBarTitle
                            cp
                            large
                            iconName={activeIconName}
                            title={(displayCheckBox && !!pipeNameAsDefault) ? 'MyPipeline' : defaultNames[nameIndex].name + '187'}
                            subtitle={activeOptionName} />
                    </View>
                    <Text appearance='hint' category='s2'><Icon name='alert-circle-outline' style={styles.textIcon} fill={basic} />Default names are used when creating new survey item (e.g. test point, rectifier or pipeline) or new reading. You can manually declare names in edit screen, or you can customize default names here, and they will be used automatically.</Text>
                </ScrollView>
                <MainActionButton
                    valid={true}
                    onPress={onSaveHandler}
                    title={'Save'} />
            </>
        )
    }
    else return <View style={styles.emptyView}><ActivityIndicator /></View>
}

export default DefaultNames

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 12,
    },
    emptyView: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkBox: {
        paddingVertical: 12,
    },
    checkBoxHidden: {
        display: 'none'
    },
    input: {
        paddingTop: 12
    },
    textIcon: {
        width: 15,
        height: 15,
        marginRight: 6
    },
    example: {
        flex: 1,
        marginTop: 32,
        padding: 12,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: basic300,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24
    }
})