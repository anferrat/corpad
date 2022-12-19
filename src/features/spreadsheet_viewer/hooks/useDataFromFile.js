import { useEffect, useState } from 'react'
import { parseCSV } from '../../../helpers/csv_generator'
import { readFile } from '../../../api/files/fs'
import { errorHandler } from '../../../helpers/error_handler'
import { getData } from '../helpers/function'
import { useNavigation } from '@react-navigation/native'


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
    //Max values for optimization
    const MAX_ROWS = 100
    const MAX_FIELDS = 50

    useEffect(() => {
        const loadData = async () => {
            if (!values.loading)
                setValues(old => ({ ...old, loading: true }))
            const fileData = await readFile(uri)
            if (fileData.status === 200) {
                const parsed = await parseCSV(fileData.result)
                if (parsed.status === 200) {
                    const rowLimitReached = parsed.result.data.length > (MAX_ROWS)
                    const fieldsLimitReached = parsed.result.meta.fields.length > (MAX_FIELDS)
                    const data = parsed.result.data.filter((_, i) => i <= (MAX_ROWS - 1))
                    const fields = parsed.result.meta.fields.filter((_, i) => i <= (MAX_FIELDS - 1))
                    setValues(
                        {
                            loading: false,
                            data: getData(data, fields),
                            fields: fields,
                            limitReached: {
                                row: rowLimitReached,
                                field: fieldsLimitReached
                            }
                        }
                    )
                    return
                }
                else errorHandler(parsed.status, navigation.goBack)
            }
            else errorHandler(fileData.status, navigation.goBack)
            setLoading(false)
        }
        loadData()
    }, [])
    return values
}