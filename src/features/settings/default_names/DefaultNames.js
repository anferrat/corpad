import React, { useState, useEffect, useRef } from 'react'
import { Icon } from '@ui-kitten/components'
import { ScrollView, StyleSheet, View } from 'react-native'
import { sendRequest } from '../../../api/database/index'
import MainActionButton from '../../../components/ActionButton'
import { globalStyle } from '../../../styles/styles'
import { basic300, primary } from '../../../styles/colors'
import { errorHandler } from '../../../helpers/error_handler'
import InputNameField from './InputNameField'
import SelectNameField from './SelectNameField'
import CheckBoxData from './CheckBoxData'
import DefaultNameExample from './components/DefaultNameExample'
import Hint from './components/Hint'
import LoadingView from '../../../components/LoadingView'

const convertIndex = (index) => index.section * 3 + index.row

const renderIcon = (name) => (props) => <Icon {...props} pack='cp' name={name} fill={primary} />


const DefaultNames = (props) => {
    const [data, setData] = useState({
        loaded: false,
        selectedIndex: 0,
        value: null,
        defaultNamesList: [],
        pipeNameSelected: 0,
    })
    const componentMounted = useRef(true)
    const pipeNameAsDefaultOption = React.useMemo(() => (data.selectedIndex === 3 || data.selectedIndex === 7), [data]) // PL and RS cards 


    useEffect(() => {
        const fetchData = async () => {
            const defNamesFromDb = await sendRequest('SELECT', 'DEFAULT_NAMES', {})
            const settings = await sendRequest('SELECT', 'SETTINGS', {})
            if (defNamesFromDb.status == 200 && settings.status === 200) {
                if (componentMounted.current) {
                    setData(old => ({
                        ...old,
                        loaded: true,
                        defaultNamesList: defNamesFromDb.result,
                        value: defNamesFromDb.result[old.selectedIndex].name,
                        pipeNameSelected: settings.result.pipelineNameAsDefault
                    }))

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
        const updateDefaultNamesRequest = await sendRequest('UPDATE', 'DEFAULT_NAME', data.defaultNamesList)
        const updateSettingsRequest = await sendRequest('UPDATE', 'SETTING', { setting: 'pipelineNameAsDefault', value: data.pipeNameSelected })
        if (updateDefaultNamesRequest.status === 200 && updateSettingsRequest.status === 200)
            props.goBack()
        else errorHandler(623)
    }, [data, props.goBack])

    return (
        <LoadingView loading={!data.loaded}>
            <ScrollView style={styles.mainView}>
                <View style={globalStyle.card}>
                    <SelectNameField
                        setData={setData}
                        defaultNamesList={data.defaultNamesList}
                        selectedIndex={data.selectedIndex} />
                    <InputNameField
                        setData={setData}
                        value={data.value}
                        disabled={data.pipeNameSelected && pipeNameAsDefaultOption} />
                    <CheckBoxData
                        visible={pipeNameAsDefaultOption}
                        setData={setData}
                        checked={!!data.pipeNameSelected} />
                    <DefaultNameExample
                        selectedType={data.defaultNamesList[data.selectedIndex]?.type}
                        displayPipelineName={data.pipeNameSelected && pipeNameAsDefaultOption}
                        defaultName={data.defaultNamesList[data.selectedIndex]?.name} />
                    <Hint
                        text='Default names are used when creating new survey item (e.g. test point, rectifier or pipeline) or new reading. You can manually declare names in edit screen, or you can customize default names here, and they will be used automatically.' />
                </View>
            </ScrollView>
            <MainActionButton
                valid={true}
                onPress={onSaveHandler}
                title='Save' />
        </LoadingView>
    )
}

export default DefaultNames

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
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