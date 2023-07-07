import React from 'react'
import { Icon, ListItem } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import { basic200, basic300, control, primary, success } from '../../../../../styles/colors'

const checkedBox = (props) => <Icon {...props} fill={primary} name='checkmark-circle-2' />
const emptyBox = (props) => <Icon {...props} name='radio-button-off' />

const CheckBoxListItem = ({ title, checked, description, value, onPress }) => {

    const onSelectItem = React.useCallback(() => onPress(value), [value, onPress])
    return (
        <ListItem
            style={styles.listItem}
            onPress={onSelectItem}
            description={description}
            accessoryLeft={checked ? checkedBox : emptyBox}
            title={title} />
    )
}

const styles = StyleSheet.create({
    listItem: {
       marginHorizontal: -12
    },
    selected: {
        borderRadius: 10,
        borderColor: basic300
    }
})

export default React.memo(CheckBoxListItem)

