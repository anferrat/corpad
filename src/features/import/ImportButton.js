import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setRefresh } from "../../store/actions/list"
import { refreshMarkers } from "../../store/actions/map"
import { updateSetting } from "../../store/actions/settings"
import { errorHandler } from "../../helpers/error_handler"
import { importIcon } from "../../components/Icons"
import ImportModal from "./components/ImportModal"
import MainActionButton from "../../components/ActionButton"
import { genRequestObject, importData } from "./helpers/functions"


const ImportButton = (props) => {
    const importState = useSelector(state => state.importData)
    const [modalVisible, setModalVisible] = useState(false)
    const [requestObject, setRequestObject] = useState([])
    const warnings = useMemo(() => requestObject.map((r, index) => ({ failedProperties: r?.failedProperties, row: index })).filter(fp => fp.failedProperties.length !== 0), [requestObject])
    const dispatch = useDispatch()

    const importHandler = () => {
        setRequestObject(genRequestObject(importState.data, importState.fields, importState.item, importState.itemImportedProperties))
        setModalVisible(true)
    }

    const importDataHandler = async () => {
        setModalVisible(false)
        dispatch(updateSetting('loader', {
            title: 'Importing...',
            visible: true
        }))

        const insert = await importData(requestObject.map(r => r.requestObject), importState.itemType)
        if (insert.status === 200) {
            props.navigateToList(importState.itemType)
            errorHandler(201, () => {
                dispatch(setRefresh(importState.itemType))
                if (importState.itemType === 'TEST_POINT' || importState.itemType === 'RECTIFIER')
                    dispatch(refreshMarkers())
            })
        }
        else errorHandler(418)
        dispatch(updateSetting('loader', {
            visible: false
        }))
    }

    return (
        <>
            <MainActionButton
                title='Import'
                icon={importIcon}
                valid={true}
                onPress={importHandler} />
            <ImportModal
                onImport={importDataHandler}
                visible={modalVisible}
                dismiss={setModalVisible.bind(this, false)}
                itemType={importState.itemType}
                itemCount={requestObject.length}
                warnings={warnings}
            />
        </>
    )
}

export default ImportButton