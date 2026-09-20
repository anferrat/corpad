import React from 'react'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'
import { Text } from '@ui-kitten/components'
import LoadingView from '../../../components/LoadingView'
import { globalStyle } from '../../../styles/styles'
import LanguageSelect from './components/LanguageSelect'
import useLocalization from './hooks/useLocalization'
import { translate } from '../../../localization'

export const Localization = () => {
    const { locale, loading, languageOptions, selectedIndex, updateLocale } = useLocalization()

    const onSelectLanguage = async index => {
        const selectedLocale = languageOptions[index]?.value
        if (selectedLocale === undefined || selectedLocale === locale)
            return

        const updated = await updateLocale(selectedLocale)
        if (updated)
            Alert.alert(
                translate('dialogs.attention'),
                translate('dialogs.restartRequired'),
                [{ text: translate('actions.ok') }]
            )
    }

    return (
        <LoadingView loading={loading}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={globalStyle.card}>
                    <LanguageSelect
                        languageOptions={languageOptions}
                        selectedIndex={selectedIndex}
                        onSelect={onSelectLanguage} />
                    <Text appearance='hint'>
                        {translate('dialogs.restartRequired')}
                    </Text>
                </View>
            </ScrollView>
        </LoadingView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 24
    }
})
