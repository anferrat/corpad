import { Divider, Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import SingleIconButton from '../SingleIconButton'

const HeaderTitle = (props) => {
    return (
        <>
            <View style={styles.mainView}>
                <SingleIconButton
                    iconName='arrow-back-outline'
                    onPress={props.backAction} />
                <Text category='h6' style={styles.text}>{props.title}</Text>
            </View>
            <Divider />
        </>
    )
}

export default React.memo(HeaderTitle)

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        padding: 6,
        alignItems: 'center'
    },
    text: {
        paddingLeft: 12
    }
})