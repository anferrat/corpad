import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { RadioGroup } from '@ui-kitten/components'
import Radio from './components/Radio'
import { globalStyle } from '../../../styles/styles'
import ItemSelectorCard from './components/item/ItemSelectorCard'
import Title from './components/Title'
import useExportItemProperties from './hooks/useExportItemProperties'
import ItemPropertySelector from './components/item/ItemPropertySelector'
import BottomButton from '../../../components/BottomButton'
import { ItemTypes, SortingOptions, ExportFormatTypes } from '../../../constants/global'
import { SortingOptionLabels } from '../../../constants/labels'
import CheckBoxText from './components/item/CheckBoxText'
import FormatRadio from './components/item/FormatRadio'
import { translateSettings } from '../../../localization'

//filter out sorting by location. N/A for here
const sortingValues = Object.values(SortingOptions).filter(sorting => sorting !== SortingOptions.NEAREST)

const ItemProperties = ({ navigateToExportOverview, navigateToExportPotentials, navigateToExportSubitems }) => {
    const { itemType,
        sorting,
        itemProperties,
        properties,
        loading,
        exportType,
        onSelectItemType,
        onSelectSorting,
        toggleItemProperty,
        onNextPress,
        onSelectExportFormat,
        onCheckIncludeMapLayers,
        assetOptionAvailable,
        sortingOptionAvailable,
        includeAssets,
        formatOptionAvailable,
        includeMapLayers,
        mapLayerOptionAvailable,
        setIncludeAssets
    } = useExportItemProperties({ navigateToExportPotentials, navigateToExportSubitems, navigateToExportOverview })

    return (
        <>
            <ScrollView
                contentContainerStyle={styles.scrollView}>
                <View style={globalStyle.card}>
                    <Title
                         name={translateSettings('exportedItems')} />
                    <View
                        style={styles.itemSelector}>
                        {Object.values(ItemTypes).map(type =>
                            <ItemSelectorCard
                                key={type}
                                itemType={type}
                                selectedItemType={itemType}
                                onPress={onSelectItemType}
                            />)}
                    </View>
                    {formatOptionAvailable ? <>
                        <Title
                             name={translateSettings('format')} />
                        <View
                            style={styles.radioGroup}>
                            {Object.values(ExportFormatTypes).map((format) =>
                                <FormatRadio
                                    format={format}
                                    onChange={onSelectExportFormat}
                                    checked={format === exportType}
                                    key={format} />
                            )}
                        </View>
                    </> : null}
                    {mapLayerOptionAvailable ? <>
                        <Title
                             name={translateSettings('mapLayers')} />
                        <CheckBoxText
                            checked={includeMapLayers}
                            onPress={onCheckIncludeMapLayers}>
                                 {translateSettings('includeMapLayers')}
                        </CheckBoxText>
                    </> : null}
                    {assetOptionAvailable ? <>
                        <Title
                             name={translateSettings('images').toUpperCase()} />
                        <CheckBoxText
                            onPress={setIncludeAssets}
                            checked={includeAssets}>
                                 {translateSettings('includeImagesExport')}
                        </CheckBoxText>
                    </> : null}
                    {sortingOptionAvailable ?
                        <>
                            <Title
                                 name={translateSettings('sorting').toUpperCase()} />
                            <RadioGroup
                                onChange={onSelectSorting}
                                selectedIndex={sorting}
                                style={styles.radioGroup}>
                                {sortingValues.map((sorting) => (
                                    <Radio
                                        key={sorting}>
                                        {SortingOptionLabels[sorting]}
                                    </Radio>
                                ))}
                            </RadioGroup>
                        </>
                        : null}
                    <Title
                         name={translateSettings('itemProperties')} />
                    <ItemPropertySelector
                        loading={loading}
                        itemProperties={itemProperties}
                        properties={properties}
                        toggleItemProperty={toggleItemProperty} />
                </View>
            </ScrollView>
            <BottomButton
                iconPosition={'right'}
                icon={'arrow-circle-right'}
                 title={translateSettings('next')}
                onPress={onNextPress}
            />
        </>
    )
}

export default ItemProperties

const styles = StyleSheet.create({
    itemSelector: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 12,
    },
    tokens: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    radioGroup: {
        marginBottom: 12
    },
    scrollView: {
        paddingBottom: 72
    },
})
