import React from 'react'
import { StyleSheet, View } from 'react-native'
import { CheckBox, Icon, Text } from '@ui-kitten/components'
import { basic } from '../../../../styles/colors'

const CheckBoxListItem = ({ status, onChange, checked, icon, pack, title, value }) => {

    const onChangeHandler = () => onChange(value)

    return (
        <View style={styles.mainView}>
            <CheckBox
                status={status ?? 'primary'}
                style={styles.checkbox}
                onChange={onChangeHandler}
                checked={checked}>{
                    () =>
                        <Text
                            style={styles.text}
                            category={'s1'}>
                            {title}
                        </Text>}
            </CheckBox>
            <Icon
                pack={pack}
                name={icon}
                style={styles.icon}
                fill={basic} />
        </View>
    )
}

export default React.memo(CheckBoxListItem)

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