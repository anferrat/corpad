import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider, CheckBox, Icon, Text } from '@ui-kitten/components'
import { basic } from '../../../../styles/colors'

const CheckBoxListItem = (props) => {
    return (
        <>
            <View style={styles.mainView}>
                <CheckBox
                    status={props.status ?? 'primary'}
                    style={styles.checkbox}
                    onChange={props.onChange}
                    checked={props.checked}>{
                        () =>
                            <Text
                                style={styles.text}
                                category={'s1'}>
                                {props.title}
                            </Text>}
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
    },
    text: {
        paddingLeft: 12
    }
})