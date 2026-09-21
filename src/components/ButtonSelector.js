import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from '@ui-kitten/components'

const ButtonSelector = (props) => {
    return (
        <View style={styles.mainView}>
            {
                props.buttons.map((b, i) => <Button
                    style={styles.button}
                    disabled={props.disabled}
                    onPress={i !== props.selectedIndex ? props.setSelected?.bind(this, i) : null}
                    status={i === props.selectedIndex ? 'primary' : 'basic'}
                    key={'ButtonSelector-' + b.title}>
                    {props.singleLine ?
                        evaProps => (
                            <Text {...evaProps} numberOfLines={1} ellipsizeMode='tail'>
                                {b.title}
                            </Text>
                        ) : b.title}
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
