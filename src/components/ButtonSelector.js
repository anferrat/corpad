import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from '@ui-kitten/components'

const ButtonSelector = (props) => {
    return (
        <View style={{ ...styles.mainView, elevation: props.elevation ? 5 : 0 }} >
            {
                props.buttons.map((b, i) => <Button
                    style={styles.button}
                    disabled={props.disabled}
                    onPress={i !== props.selectedIndex ? props.setSelected?.bind(this, i) : null}
                    status={i === props.selectedIndex ? 'primary' : 'basic'}
                    key={'ButtonSelector-' + b.title}
                >
                    {b.title}
                </Button>)
            }
        </View >
    )
}

export default ButtonSelector

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        flex: 1,
        borderRadius: 6,
        overflow: 'hidden',
    },
    button: {
        flex: 1,
        borderRadius: 0,
        borderWidth: 0
    }

})