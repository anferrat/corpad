import { useEffect, useState } from 'react'
import { errorHandler } from '../../../helpers/error_handler'
import { getData } from '../helpers/function'
import { useNavigation } from '@react-navigation/native'
import { loadSpreadsheetFile } from '../../../app/controllers/survey/other/ExportedFileController'

export const useDataFromFile = (uri) => {
    const [values, setValues] = useState({
        data: [],
        loading: true,
        fields: [],
        limitReached: {
            row: false,
            field: false
        }
    })
    const navigation = useNavigation()


    useEffect(() => {
        const loadData = async () => {
            if (!values.loading)
                setValues(old => ({ ...old, loading: true }))
            const { response, status } = await loadSpreadsheetFile({ path: uri })
            if (status === 200) {
                const { rowLimitReached, fieldsLimitReached, fields, data } = response
                setValues({
                    loading: false,
                    data: getData(data, fields),
                    fields: fields,
                    limitReached: {
                        row: rowLimitReached,
                        field: fieldsLimitReached
                    }
                })
            }
            else {
                errorHandler(status, navigation.goBack)
            }
        }
        loadData()
    }, [])
    return values
}