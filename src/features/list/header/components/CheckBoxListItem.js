import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider, CheckBox, Icon } from '@ui-kitten/components'
import { basic } from '../../../../styles/colors'

const CheckBoxListItem = (props) => {
    return (
        <>
            <View style={styles.mainView}>
                <CheckBox
                    status={props.status ?? 'primary'}
                    style={styles.checkbox}
                    onChange={props.onChange}
                    checked={props.checked}>
                    {props.title}
                </CheckBox>
                <Icon pack={props.status === undefined ? 'cp' : undefined} name={props.icon} style={styles.icon} fill={basic} />
            </View>
            <Divider />
        </>
    )
}

export default React.memo(CheckBoxListItem, (prev, next) => prev.checked === next.checked)

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    checkbox: {
        height: 60,
        paddingLeft: 24
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 24
    }
})