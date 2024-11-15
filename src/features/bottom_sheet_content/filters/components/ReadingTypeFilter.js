import React from "react"
import { useFilter } from "../hooks/useFilter"
import CheckBoxListItem from "./CheckBoxListItem"
import { SubitemTypeAllocation } from "../../../../constants/global"
import { SubitemTypeIcons } from "../../../../constants/icons"
import { SubitemTypeLabels } from "../../../../constants/labels"
import { FlashList } from "@shopify/flash-list"

function ReadingTypeFilter({ excluded, onApply, visible, itemType }) {
    const { notSelected, onChange } = useFilter({ excluded, visible, onApply })

    const renderItem = ({ item }) =>
        <CheckBoxListItem
            key={item}
            icon={SubitemTypeIcons[item]}
            onChange={onChange}
            checked={!~notSelected.indexOf(item)}
            value={item}
            status={'primary'}
            pack={'cp'}
            title={SubitemTypeLabels[item]}
        />

    return (
        <FlashList
            data={Object.values(SubitemTypeAllocation[itemType])}
            renderItem={renderItem}
            extraData={notSelected}
            estimatedItemSize={60} />
    )
}

export default ReadingTypeFilter