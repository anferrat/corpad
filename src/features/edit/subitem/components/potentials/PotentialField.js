import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '@ui-kitten/components'
import SingleIconButton from '../../../../../components/IconButton'
import Input from '../../../../../components/Input'
import { ReferenceCellCodeLabels, PotentialUnitLabels } from '../../../../../constants/labels'

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
    const title = React.useCallback(() => <Text
        appearance='hint'
        numberOfLines={1}
        ellipsizeMode='tail'
        style={styles.title}>{props.title}
    </Text>, [props.title])

    const unit = React.useMemo(() => ({
        main: PotentialUnitLabels[props.unit],
        script: ReferenceCellCodeLabels[props.referenceCellType]
    }), [])

    const removeButton = React.useMemo(() => <View style={styles.button}>
        <SingleIconButton
            iconName='close'
            onPress={props.deletePotentialHandler.bind(this, props.index, props.id)}
        />
    </View>, [props.deletePotentialHandler, props.index, props.id])

    return (
        <View style={styles.mainView}>
            <Input
                accessoryLeft={title}
                keyboardType='numeric'
                displayHint={true}
                selectTextOnFocus={true}
                maxLength={7}
                textAlign='center'
                hintTitle={props.referenceCellName}
                hintIcon='RE'
                value={text}
                valid={props.valid}
                style={styles.input}
                property='potential'
                onChangeText={setText}
                onEndEditing={props.onSubmit.bind(this, text, props.index)}
                unit={unit} />
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