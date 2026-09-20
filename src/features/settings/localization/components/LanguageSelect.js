import React, { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import Select from '../../../../components/Select'
import { translate } from '../../../../localization'

const LanguageSelect = ({ languageOptions, selectedIndex, onSelect }) => {
    const itemList = useMemo(() => languageOptions.map(({ value, key }) => ({
        value,
        item: translate(`language.${key}`)
    })), [languageOptions])

    return (
        <Select
            style={styles.select}
            label={translate('language.label')}
            placeholder={translate('language.placeholder')}
            itemList={itemList}
            selectedIndex={selectedIndex}
            onSelect={onSelect} />
    )
}

export default React.memo(LanguageSelect)

const styles = StyleSheet.create({
    select: {
        paddingBottom: 12
    }
})
