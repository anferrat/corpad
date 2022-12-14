import { useEffect, useState } from 'react'
import { parseCSV, parseSimple } from '../../../helpers/csv_generator'
import { readFile } from '../../../api/files/fs'
import { errorHandler } from '../../../helpers/error_handler'
import { getData } from '../helpers/function'
import { useNavigation } from '@react-navigation/native'


export const useDataFromFile = (uri) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [fields, setFields] = useState([])
    const navigation = useNavigation()

    useEffect(() => {
        const loadData = async () => {
            if (!loading)
                setLoading(true)
            const fileData = await readFile(uri)
            if (fileData.status === 200) {
                const parsed = parseCSV(fileData.result)
                setData(getData(parsed.data, parsed.meta.fields))
                setFields(parsed.meta.fields)
                setLoading(false)
                return
            }
            else errorHandler(fileData.status, navigation.goBack)
            setLoading(false)
        }
        loadData()
    }, [])
    return { loading, data, fields }
}