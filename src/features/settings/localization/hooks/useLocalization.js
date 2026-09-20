import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { getLocale, updateLocale as updateLocaleRequest } from '../../../../app/controllers/survey/other/LocalizationController'
import { errorHandler } from '../../../../helpers/error_handler'
import { LanguagePreferences } from '../../../../localization/languages'

const useLocalization = () => {
    const [locale, setLocale] = useState(null)
    const [loading, setLoading] = useState(true)
    const componentMounted = useRef(true)
    const navigation = useNavigation()

    const languageOptions = useMemo(() => [
        { value: LanguagePreferences.SYSTEM, key: 'system' },
        { value: LanguagePreferences.ENGLISH, key: 'english' },
        { value: LanguagePreferences.SPANISH, key: 'spanish' }
    ], [])

    const selectedIndex = languageOptions.findIndex(({ value }) => value === locale)

    useEffect(() => {
        componentMounted.current = true
        getLocale(
            error => errorHandler(error, navigation.goBack),
            value => {
                if (componentMounted.current) {
                    setLocale(value)
                    setLoading(false)
                }
            })

        return () => {
            componentMounted.current = false
        }
    }, [navigation])

    const updateLocale = useCallback(async value => {
        const previousLocale = locale
        setLocale(value)
        const { status } = await updateLocaleRequest(value, error => errorHandler(error))
        if (status !== 200 && componentMounted.current)
            setLocale(previousLocale)
        return status === 200
    }, [locale])

    return {
        locale,
        loading,
        languageOptions,
        selectedIndex,
        updateLocale
    }
}

export default useLocalization
