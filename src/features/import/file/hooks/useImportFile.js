import { useState, useCallback, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectFileForImport } from "../../../../app/controllers/survey/ImportController"
import { errorHandler } from "../../../../helpers/error_handler"
import { resetImportItem, setImportData } from "../../../../store/actions/importData"

const useImportFile = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const fileName = useSelector(state => state.importData.fileName)
    const uri = useSelector(state => state.importData.uri)
    const rows = useSelector(state => state.importData.data.length ?? null)
    const columns = useSelector(state => state.importData.fields.length)

    const selectFile = useCallback(async () => {
        setLoading(true)
        const { response, status } = await selectFileForImport()
        if (status === 200) {
            const { pipelines, fields, data, referenceCells, fileName, uri, potentialTypes, defaultNames, autoCreatePotentials } = response
            dispatch(setImportData(fields, data, fileName, defaultNames, uri, potentialTypes, referenceCells, pipelines, autoCreatePotentials))
        }
        else if (status !== 101)
            errorHandler(status)
        setLoading(false)
    }, [])

    const resetFile = useCallback(() => {
        dispatch(resetImportItem())
    }, [])

    useEffect(() => () => resetFile(), [])

    return {
        loading,
        fileName,
        uri,
        rows,
        columns,
        selectFile,
        resetFile
    }
}

export default useImportFile