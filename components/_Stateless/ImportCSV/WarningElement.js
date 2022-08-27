import React from 'react'
import { Text } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'


const genImportWarning = (property, value, row) => {
    switch (property) {
        case 'name':
            if (value === "" || value === 'null')
                return `Name cannot be empty. Converted to "Row ${row}"`
            else return `Name has invalid characters or is too long. Converted to "Row ${row}"`
        default:
            return `Value "${value}" cannot be used as property "${property}"`
    }
}

const WarningElement = (props) => {
    return (
        <>
            <Text category={'p2'}>Row {props.row}: </Text>
            {props.failedProperties.map((fp, index) => <Text key={index} category={'s2'} style={styles.warningText} appearance='hint'>- {genImportWarning(fp.property, fp.invalidValue, props.row)}</Text>)}

        </>
    )
}

export default WarningElement

const styles = StyleSheet.create({
    warningText: {
        paddingLeft: 10
    }
})