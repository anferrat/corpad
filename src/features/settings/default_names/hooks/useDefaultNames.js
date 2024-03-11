import { useCallback, useState, useEffect, useRef, useMemo } from "react";
import { getDefaultNameList, updateDefaultNameList } from "../../../../app/controllers/survey/other/DefaultNameController";
import { errorHandler } from "../../../../helpers/error_handler";
import fieldValidation from '../../../../helpers/validation'
import { useNavigation } from "@react-navigation/native";
import { ItemTypes, SubitemTypes } from "../../../../constants/global";
import { ItemTypeLabels, SubitemTypeLabels } from "../../../../constants/labels";


const useDefaultNames = () => {
    const [defaultNames, setDefaultNames] = useState({})
    const [loading, setLoading] = useState(true)
    const [selectedType, setSelectedType] = useState(ItemTypes.TEST_POINT)
    const [pipelineNameAsDefault, setPipelineNameAsDefault] = useState(true)
    const [name, setName] = useState({
        value: true,
        valid: true,
    })
    const { value, valid } = name
    const navigation = useNavigation()

    const itemList = useMemo(() => Object.keys(defaultNames).map(type => ({ item: ItemTypeLabels[type] ?? SubitemTypeLabels[type], type: type, value: defaultNames[type] })), [defaultNames])
    const selectedIndex = itemList.findIndex(({ type }) => type === selectedType)
    const accessoryList = useMemo(() => Object.keys(defaultNames).map(type => ({ icon: type, pack: 'cp' })), [defaultNames])

    const pipelineNameSettingActive = selectedType === SubitemTypes.PIPELINE || selectedType === SubitemTypes.RISER

    const componentMounted = useRef(true)

    useEffect(() => {
        componentMounted.current = true
        getDefaultNameList(
            er => errorHandler(er),
            ({ defaultNames, pipelineNameAsDefault }) => {
                setDefaultNames(defaultNames)
                setPipelineNameAsDefault(pipelineNameAsDefault)
                setLoading(false)
                setName({
                    value: defaultNames[selectedType] ?? null,
                    valid: true
                })
            }
        )
        return () => {
            componentMounted.current = false
        }
    }, [])

    const onChangeText = useCallback((text) => setName(state => ({ ...state, value: text })), [])

    const onEndEditing = useCallback(() => {
        const validation = fieldValidation(value, 'defaultName')
        if (validation.valid)
            setDefaultNames(state => ({
                ...state,
                [selectedType]: validation.value
            }))
        setName({
            value: validation.value,
            valid: validation.valid
        })
    }, [value, selectedType])

    const onChangeType = useCallback((index) => {
        setSelectedType(itemList[index].type)
        setName({
            value: itemList[index].value,
            valid: true
        })
    }, [itemList])

    const onChangePipelineNameSetting = useCallback((checked) => {
        setPipelineNameAsDefault(checked)
    }, [])

    const updateNames = useCallback(() => {
        updateDefaultNameList({ defaultNames, pipelineNameAsDefault }, (er) => errorHandler(er), () => navigation.goBack())
    }, [defaultNames, pipelineNameAsDefault])


    return {
        defaultNames,
        loading,
        selectedType,
        selectedIndex,
        value,
        valid,
        pipelineNameAsDefault,
        pipelineNameSettingActive,
        itemList,
        accessoryList,
        onChangeText,
        onEndEditing,
        onChangeType,
        updateNames,
        onChangePipelineNameSetting
    }

}

export default useDefaultNames