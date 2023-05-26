import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Radio, RadioGroup } from '@ui-kitten/components'
import { globalStyle } from '../../../styles/styles'
import ItemSelectorCard from './components/item/ItemSelectorCard'
import Title from './components/Title'
import useExportItemProperties from './hooks/useExportItemProperties'
import ItemPropertySelector from './components/item/ItemPropertySelector'
import BottomButton from '../../../components/BottomButton'
import { ItemTypes, SortingOptions } from '../../../constants/global'
import { SortingOptionLabels } from '../../../constants/labels'

//filter sorting by location. N/A for here
const sortingValues = Object.values(SortingOptions).filter(sorting => sorting !== SortingOptions.NEAREST)

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
    },
    scrollView: {
        paddingBottom: 72
    }

})