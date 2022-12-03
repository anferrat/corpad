import React from 'react'
import { View } from 'react-native'
import MultiSelect from '../../../components/MultiSelect'
import SelectField from '../../../components/Select'


const AttributeMapElement = (props) => {
    return (
        <View>
            <SelectField
                itemsList={props.itemList}
                selectedItem={props.index}
            />
            <MultiSelect
                itemsList={props.availableValues}
                selectedItems={props.mappedIndexes}
            />
        </View>
    )
}

export default AttributeMapElement