import React, { useState, useEffect } from 'react'
import { BackHandler } from 'react-native'
import ModalCompleted from './ModalCompleted'
import ModalProgress from './ModalProgress'
import ModalError from './ModalError'
import ModalStart from './ModalStart'
import { useDispatch } from 'react-redux'
import { updateSetting } from '../../../../store/actions/settings'

const initialState = {
    importing: false,
    completed: false,
    status: null,
    currentIndex: 0,
    warningCount: 0,
    successCount: 0,
    failedCount: 0,
    warnings: [],
    idList: [],
    importTime: null
}

const ImportModalContent = ({
    count,
    itemType,
    importHandler,
    fileName,
    visible,
    navigateToList,
    hideModal
}) => {
    const [importedStatus, setImportedStatus] = useState(initialState)
    const dispatch = useDispatch()

    const onImportHandler = React.useCallback(({ id, warnings, success, index }) => {
        setImportedStatus(old => ({
            ...old,
            currentIndex: index,
            successCount: success ? old.successCount + 1 : old.successCount,
            failedCount: success ? old.failedCount : old.failedCount + 1,
            warningCount: old.warningCount + warnings.length,
            warnings: success && warnings.length === 0 ? old.warnings : [...old.warnings, {
                rowIndex: index,
                success: success,
                warnings: warnings
            }],
            idList: success ? old.idList.concat(id) : old.idList,
        }))
    }, [setImportedStatus])

    const onImportStart = async () => {
        setImportedStatus(old => ({ ...old, importing: true }))
    }

    useEffect(() => {
        const importing = async () => {
            const response = await importHandler(onImportHandler)
            console.log(response)
            setImportedStatus(old => ({
                ...old,
                completed: true,
                importing: false,
                status: response.status,
                importTime: response.status === 200 ? response.response.importTime : old.importTime
            }))
        }
        if (importedStatus.importing)
            importing()
    }, [importedStatus.importing])

    useEffect(() => {
        if (importedStatus.completed)
            dispatch(updateSetting('lastImport', {
                idList: importedStatus.idList,
                itemType: itemType,
                importTime: importedStatus.importTime
            }))
    }, [importedStatus.completed])

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (visible && !importedStatus.importing && !importedStatus.completed) {
                hideModal()
                return true
            }
            else if (visible && (importedStatus.completed || importedStatus.importing)) {
                return true
            }
            else return false
        })
        return () => {
            backHandler.remove()
        }
    }, [importedStatus.importing, importedStatus.completed, hideModal, visible])

    if (count === 0)
        return <ModalError
            hideModal={hideModal} />
    else if (!importedStatus.importing && !importedStatus.completed)
        return <ModalStart
            count={count}
            fileName={fileName}
            onImportStart={onImportStart}
            itemType={itemType}
            hideModal={hideModal} />
    else if (importedStatus.importing && !importedStatus.completed)
        return <ModalProgress
            count={count}
            itemType={itemType}
            currentIndex={importedStatus.currentIndex}
            hideModal={hideModal} />
    else if (importedStatus.completed)
        return <ModalCompleted
            status={importedStatus.status}
            warnings={importedStatus.warnings}
            successCount={importedStatus.successCount}
            warningCount={importedStatus.warningCount}
            failedCount={importedStatus.failedCount}
            navigateToList={navigateToList}
            itemType={itemType} />
    else return null
}

export default ImportModalContent