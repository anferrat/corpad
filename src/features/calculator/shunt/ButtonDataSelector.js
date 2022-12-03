import React from 'react'
import { StyleSheet, View } from 'react-native'
import ButtonSelector from '../../../components/ButtonSelector'

const ButtonDataSelector = (props) => {
    const setValue = React.useCallback((value) => props.setValue('factorSelected', value), [])
    const buttons = React.useMemo(() => [{ title: 'Ratio' }, { title: 'Factor' }], [])
    if (props.disabled)
        return null
    else
        return (
            <View style={styles.mainView}>
                <ButtonSelector
                    buttons={buttons}
                    selectedIndex={props.selectedIndex}
                    setSelected={setValue}
                />
            </View>
        )
}

export default React.memo(ButtonDataSelector)

const styles = StyleSheet.create({
    mainView: {
        paddingVertical: 6
    }
})