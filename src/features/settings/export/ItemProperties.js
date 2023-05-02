import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Radio, RadioGroup } from '@ui-kitten/components'
import { globalStyle } from '../../../styles/styles'
import { items, } from '../../../constants/constants'
import ItemSelectorCard from './components/item/ItemSelectorCard'
import { sortingOptions } from '../../../constants/constants'
import Title from './components/Title'
import useExportItemProperties from './hooks/useExportItemProperties'
import ItemPropertySelector from './components/item/ItemPropertySelector'
import BottomButton from '../../../components/BottomButton'

//filter sorting by location. N/A for here
const sortingValues = sortingOptions.filter((_, i) => i !== 4)

const ItemProperties = ({ navigateToExportOverview, navigateToExportPotentials, navigateToExportSubitems }) => {
    const { itemType,
        sorting,
        itemProperties,
        properties,
        loading,
        onSelectItemType,
        onSelectSorting,
        toggleItemProperty,
        onNextPress,
    } = useExportItemProperties({ navigateToExportPotentials, navigateToExportSubitems, navigateToExportOverview })

    return (
        <>
            <View style={globalStyle.card}>
                <Title
                    name={'EXPORTED ITEMS'} />
                <View
                    style={styles.itemSelector}>
                    {items.map(type =>
                        <ItemSelectorCard
                            key={type}
                            itemType={type}
                            selectedItemType={itemType}
                            onPress={onSelectItemType}
                        />)}
                </View>
                <Title
                    name={'SORTING'} />
                <RadioGroup
                    onChange={onSelectSorting}
                    selectedIndex={sorting}
                    style={styles.radioGroup}>
                    {sortingValues.map((title) => (
                        <Radio
                            key={title}>
                            {title}
                        </Radio>
                    ))}
                </RadioGroup>
                <Title
                    name={'ITEM PROPERTIES'} />
                <ItemPropertySelector
                    loading={loading}
                    itemProperties={itemProperties}
                    properties={properties}
                    toggleItemProperty={toggleItemProperty}
                />
            </View>
            <BottomButton
                icon={'arrow-circle-right-outline'}
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
    }

})