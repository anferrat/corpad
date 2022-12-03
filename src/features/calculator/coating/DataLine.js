import React from 'react'
import { View, StyleSheet } from 'react-native'
import InputDataField from './InputDataField'

const DataLine = (props) => {
    return <View style={styles.mainView}>
        <InputDataField
            point={props.point}
            property={props.property}
            status='on'
            style={styles.inputLeft}
            disabled={props.disabled}
            setValue={props.setValue}
            setValid={props.setValid}
            label={props.label}
            placeholder='ON'
            value={props.data.on}
            valid={props.valid.on}
            unit={props.unit} />
        <InputDataField
            point={props.point}
            property={props.property}
            status='off'
            style={styles.inputRight}
            disabled={props.disabled}
            setValue={props.setValue}
            setValid={props.setValid}
            placeholder='OFF'
            value={props.data.off}
            valid={props.valid.off}
            unit={props.unit} />
    </View>
}


export default React.memo(DataLine)


const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    inputLeft: {
        flex: 1,
        paddingRight: 6
    },
    inputRight: {
        flex: 1,
        paddingLeft: 6
    }
})