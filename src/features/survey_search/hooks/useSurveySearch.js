import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useCallback, useRef, useEffect, useState } from 'react'
import { searchItem } from '../../../app/controllers/survey/items/ItemController'
import { errorHandler } from '../../../helpers/error_handler'
import debounce from 'lodash.debounce'

const useSurveySearch = () => {
    const [keyword, setKeyword] = useState(null)
    const [found, setFound] = useState([])
    const [loading, setLoading] = useState(false)
    const componentMounted = useRef(true)
    const isFocused = useIsFocused()
    const navigation = useNavigation()
    const inputRef = useRef()


    useEffect(() => {
        const watch = setTimeout(() => {
            inputRef.current?.focus()
        }, 30)
        componentMounted.current = true
        return () => {
            clearInterval(watch)
            componentMounted.current = false
        }
    }, [])

    useEffect(() => {
        if (isFocused && keyword !== null)
            search(keyword)
    }, [isFocused])

    const debounceSearch = useCallback(debounce((keyword) => {
       search(keyword)
    }, 400), [])

    const search = useCallback(async (keyword) => {
        const { response, status } = await searchItem({ keyword }, er => errorHandler(er))
        if (status === 200)
            setFound(response)
        setLoading(false)
    }, [])

    const onChangeKeyword = useCallback((text) => {
        setLoading(true)
        setKeyword(text)
        debounceSearch(text)
    }, [])

    const resetSearch = useCallback(() => {
        setKeyword(null)
        setFound([])
        setLoading(false)
    }, [])


    return {
        inputRef,
        keyword,
        loading,
        found,
        dismiss: navigation.goBack,
        onChangeKeyword,
        resetSearch
    }
}

export default useSurveySearch
