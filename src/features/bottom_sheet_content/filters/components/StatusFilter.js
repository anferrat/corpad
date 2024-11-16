import React from "react"
import { ItemStatuses } from "../../../../constants/global"
import { useFilter } from "../hooks/useFilter"
import CheckBoxListItem from "./CheckBoxListItem"
import { StatusIcons } from "../../../../constants/icons"
import { StatusStatuses } from "../../../../styles/colors"
import { StatusLabels } from "../../../../constants/labels"
import { FlashList } from "@shopify/flash-list"
import { Divider } from "@ui-kitten/components"

const statusItems = Object.values(ItemStatuses).filter(status => status !== ItemStatuses.NO_STATUS)

function StatusFilter({ excluded, onApply, visible }) {
    const { notSelected, onChange } = useFilter({ excluded, visible, onApply })

    const renderItem = ({ item }) =>
        <CheckBoxListItem
            key={item}
            icon={StatusIcons[item]}
            onChange={onChange}
            checked={!~notSelected.indexOf(item)}
            value={item}
            status={StatusStatuses[item]}
            pack={undefined}
            title={StatusLabels[item]}/>

    return (
        <FlashList
            data={statusItems}
            renderItem={renderItem}
            estimatedItemSize={60}
            extraData={notSelected}
            ItemSeparatorComponent={Divider}
        />
    )
}


export default StatusFilter