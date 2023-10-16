import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { RadioGroup, CheckBox } from '@ui-kitten/components'
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
                        name={'EXPORTED ITEMS'} />
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
                            name={'FORMAT'} />
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
                            name={'MAP LAYERS'} />
                        <View style={styles.checkbox}>
                            <CheckBox
                                checked={includeMapLayers}
                                onChange={onCheckIncludeMapLayers}>
                            </CheckBox>
                            <CheckBoxText>
                                Include visible map layers
                            </CheckBoxText>
                        </View>
                    </> : null}
                    {assetOptionAvailable ? <>
                        <Title
                            name={'IMAGES'} />
                        <View style={styles.checkbox}>
                            <CheckBox
                                checked={includeAssets}
                                onChange={setIncludeAssets}>
                            </CheckBox>
                            <CheckBoxText>
                                Export images
                            </CheckBoxText>
                        </View>
                    </> : null}
                    {sortingOptionAvailable ?
                        <>
                            <Title
                                name={'SORTING'} />
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
                        name={'ITEM PROPERTIES'} />
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
                title={'Next'}
                onPress={onNextPress}
            />
        </>
    )
}

export default ItemProperties

const styles = StyleSheet.create({
    itemSelector: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        marginBottom: 12
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
    checkbox: {
        flexDirection: 'row',
        marginBottom: 24
    }
})