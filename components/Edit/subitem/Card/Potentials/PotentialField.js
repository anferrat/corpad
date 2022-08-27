import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '@ui-kitten/components'
import { referenceCellCodes } from '../../../../../constants/constants'
import SingleIconButton from '../../../../_Stateless/SingleIconButton'
import InputField from '../../../../_Stateless/InputField'

const displayTitle = (title) => <Text
    appearance='hint'
    numberOfLines={1}
    ellipsizeMode='tail'
    style={styles.title}>{title}
</Text>


const PotentialField = (props) => {
    const [text, setText] = useState(props.value)

    useEffect(() => {
        if (text !== props.value)
            setText(props.value)
    }, [props.value])

    const unit = React.useMemo(() => ({
        main: props.unit,
        script: referenceCellCodes[props.refCell?.rcType]
    }), [])

    const removeButton = React.useMemo(() => <View style={styles.button}>
        <SingleIconButton
            iconName='close'
            onPress={props.deletePotentialHandler.bind(this, props.index, props.id)}
        />
    </View>, [props.deletePotentialHandler, props.index, props.id])

    return (
        <View style={styles.mainView}>
            <InputField
                accessoryLeft={displayTitle.bind(this, props.title)}
                keyboardType='numeric'
                itemId={props.itemId}
                displayHint={true}
                selectTextOnFocus={true}
                maxLength={7}
                textAlign='center'
                hintTitle={props.refCell.name ?? 'Error'}
                hintIcon='RE'
                value={text}
                valid={props.valid}
                style={styles.input}
                property='potential'
                onChangeText={setText}
                onEndEditing={props.onSubmit.bind(this, text, props.index)}
                unit={unit}
            />
            {removeButton}
        </View>
    )
}

export default React.memo(PotentialField)

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    input: {
        flex: 1,
        paddingRight: 12,
    },
    title: {
        maxWidth: '35%'
    },
    button: {
        paddingBottom: 12,
    }
})