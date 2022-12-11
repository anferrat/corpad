import React from 'react'
import { View, StyleSheet } from 'react-native'
import InputDataField from './InputDataField'
import LayerTitle from './LayerTitle'

const WennerLayer = (props) => {
    const removeLayerHandler = React.useCallback(() => { props.removeLayerHandler(props.index) }, [props.removeLayerHandler, props.index])
    if (props.data.length > props.index)
        return (
            <>
                <LayerTitle
                    disabled={props.disabled}
                    index={props.index}
                    removeLayerHandler={removeLayerHandler}
                />
                <View style={styles.inputs}>
                    <InputDataField
                        disabled={props.disabled}
                        property={'spacing'}
                        index={props.index}
                        setValue={props.setValue}
                        setValid={props.setValid}
                        valid={props.valid[props.index]?.spacing ?? true}
                        style={styles.inputSpacing}
                        value={props.data[props.index]?.spacing}
                        unit={props.isMetric ? 'cm' : 'ft'}
                        label='Spacing' />
                    <InputDataField
                        disabled={props.disabled}
                        keyboardType={'numeric'}
                        property={'resistance'}
                        index={props.index}
                        setValue={props.setValue}
                        setValid={props.setValid}
                        style={styles.inputResist}
                        value={props.data[props.index]?.resistance}
                        valid={props.valid[props.index]?.resistance ?? true}
                        label='Resistance'
                        unit={'\u03A9'}
                    />
                </View>
            </>
        )
    return null
}

export default React.memo(WennerLayer, (prev, next) =>
    prev.data[prev.index]?.spacing === next.data[next.index]?.spacing &&
    prev.data[prev.index]?.resistance === next.data[next.index]?.resistance &&
    prev.disabled === next.disabled &&
    prev.valid[prev.index]?.spacing === next.valid[next.index]?.spacing &&
    prev.valid[prev.index]?.resistance === next.valid[next.index]?.resistance &&
    prev.isMetric === next.isMetric)

//
const styles = StyleSheet.create({
    inputs: {
        paddingVertical: 8,
        flexDirection: 'row'
    },
    inputSpacing: {
        flex: 1,
        paddingRight: 6,
    },
    inputResist: {
        flex: 1,
        paddingLeft: 6,
    },
})