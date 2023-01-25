import React, { useState, useEffect } from 'react'
import ModalCompleted from './ModalCompleted'
import ModalProgress from './ModalProgress'
import ModalError from './ModalError'
import ModalStart from './ModalStart'

const initialState = {
    completed: false,
    currentIndex: 0,
    warnings: [],
    success: [],
    failed: [],
}

const ImportModalContent = ({
    count,
    itemType,
    importHandler,
    importing,
    setImporting,
    navigateToList,
    hideModal
}) => {
    const [importedStatus, setImportedStatus] = useState(initialState)
    useEffect(() => { setImportedStatus(old => ({ ...old, completed: true })) }, [])
    const onImportStart = async () => {
        setImporting(true)
        await importHandler(({ index, success, warning, id, completed }) => {
            setImportedStatus(old => ({
                ...old,
                currentIndex: index,
                warnings: warning ? old.warnings.concat(warning) : old.warnings,
                success: success ? old.success.concat(id) : old.success,
                failed: success ? old.failed : old.failed.concat(index),
                completed: completed
            }))
        })
    }

    if (count === 0)
        return <ModalError
            hideModal={hideModal} />
    else if (!importing && !importedStatus.completed)
        return <ModalStart
            count={count}
            onImportStart={onImportStart}
            itemType={itemType}
            hideModal={hideModal} />
    else if (importing && !importedStatus.completed)
        return <ModalProgress
            count={count}
            itemType={itemType}
            currentIndex={importedStatus.currentIndex}
            hideModal={hideModal} />
    else if (importedStatus.completed)
        return <ModalCompleted
            successCount={importedStatus.success.length}
            warningCount={importedStatus.warnings.length}
            failedCount={importedStatus.failed.length}
            navigateToList={navigateToList}
            itemType={itemType} />
    else return null
}

export default ImportModalContent