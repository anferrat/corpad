import React from 'react'
import { StyleSheet, View } from 'react-native'
import SelectField from '../SelectField'
import InputField from '../InputField'
import { basic, primary } from '../../../styles/GlobalStyle'
import { Icon, Text } from '@ui-kitten/components'



const InputDisplay = (props) => {
    const accessories = React.useMemo(() => props.itemsList.map(() => <Icon name='file-text-outline' fill={basic} style={styles.accessoryIcon} />), [props.itemsList.length])
    const DefaultBadge = () => (
        <View style={styles.badge}>
            <Text category='label' status='control'>Default name</Text>
        </View>
    )
    if (props.importType === 0 || Array.isArray(props.itemList))
        return <InputField
            disabled={true}
            valid={true}
            label={props.label}
            style={{ ...props.style, marginBottom: -12 }}
            value={props.defaultValue}
        />
    else if (props.importType === 1)
        return <SelectField
            valid={true}
            style={props.style}
            placeholder={props.placeholder}
            label={props.label}
            accessoryList={accessories}
            property={props.property}
            selectAction={props.onSelect}
            itemsList={props.itemsList}
            selectedItem={props.fieldIndex} />
    else if (props.importType === 2 && props.property === 'name' && props.defaultName !== null)
        return <InputField
            accessoryLeft={DefaultBadge}
            disabled={true}
            valid={true}
            label={props.label}
            style={{ ...props.style, marginBottom: -12 }}
            value={`${props.defaultName} <index>`}
        />
    else return null
}

export default InputDisplay

const styles = {
    accessoryIcon: {
        width: 20,
        height: 20
    },
    badge: {
        borderRadius: 10,
        backgroundColor: primary,
        paddingVertical: 4,
        paddingHorizontal: 8,
        elevation: 5
    }
}