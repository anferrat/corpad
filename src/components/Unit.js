import React from "react"
import { View, StyleSheet } from "react-native"
import { Text } from "@ui-kitten/components"

/*
{ //--- cm2 ---
    main: 'cm',
    script: '2',
    format: 'super'
} 
*/


const Unit = (props) => {
    if (props.unit === null || props.unit === undefined)
        return null
    else
        if (typeof props.unit === 'string')
            return <Text style={{ ...props.styles, ...styles.unitMainBase }}>{props.unit}</Text>
        else {
            const mainStart = props.unit?.position ? props.unit.main.substr(0, props.unit.position) : props.unit.main
            const mainEnd = props.unit?.position ? props.unit.main.substr(props.unit.position) : ''
            return (
                <View style={props.unit.format === 'super' ? styles.mainViewSuper : styles.mainViewSub}>
                    <Text style={{ ...styles.unitMain, ...props.style }}>
                        {mainStart}
                    </Text>
                    <Text style={{ ...styles.unitScript, ...props.style }}>
                        {props.unit.script}
                    </Text>
                    <Text style={{ ...styles.unitMain, ...props.style }}>
                        {mainEnd}
                    </Text>
                </View>
            )
        }
}

export default Unit

const styles = StyleSheet.create({
    unitMain: {
        fontSize: 14,
    },
    unitMainBase: {
        fontSize: 14,
        paddingLeft: 6,
    },
    mainViewSuper: {
        paddingLeft: 6,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    mainViewSub: {
        paddingLeft: 6,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    unitScript: {
        marginLeft: 2,
        fontSize: 8,
    },
})