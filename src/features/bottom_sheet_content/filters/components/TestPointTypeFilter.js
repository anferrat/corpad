import React from "react"
import { TestPointTypes } from "../../../../constants/global"
import { useFilter } from "../hooks/useFilter"
import CheckBoxListItem from "./CheckBoxListItem"
import { TestPointTypeIcons } from "../../../../constants/icons"
import { TestPointTypeLabels } from "../../../../constants/labels"
import { FlashList } from "@shopify/flash-list"

function TestPointTypeFilter({ excluded, onApply, visible }) {
    const { notSelected, onChange } = useFilter({ excluded, visible, onApply })

    const renderItem = ({ item }) => <CheckBoxListItem
        key={item}
        icon={TestPointTypeIcons[item]}
        onChange={onChange}
        checked={!~notSelected.indexOf(item)}
        value={item}
        status={'primary'}
        pack={'cp'}
        title={TestPointTypeLabels[item]}
    />


    return (
        <FlashList
            data={Object.values(TestPointTypes)}
            renderItem={renderItem}
            estimatedItemSize={60}
            extraData={notSelected} />
    )
}


export default TestPointTypeFilter