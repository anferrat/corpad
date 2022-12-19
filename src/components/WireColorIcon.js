import React from "react"
import { Icon } from "@ui-kitten/components"
import { wireColorList } from "../constants/constants"

//move to edit feature

const WireColorIcon = (props) => {
    const color = wireColorList[props.colorIndex]
    if (color)
        if (color.color?.length === 1)
            return <Icon name='color-circle' pack='cp' style={props.style} fill={color.color[0]} />
        else if (color.color.length > 1)
            return <Icon name='color-circle-double' pack='cp' style={props.style} fill={color.color[0]} fill2={color.color[1]} />
        else return null
    else return null
}

export default React.memo(WireColorIcon)