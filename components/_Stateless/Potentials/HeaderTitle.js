import { Divider, Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { androidStyle, primary } from '../../../styles/GlobalStyle'
import SingleIconButton from '../SingleIconButton'

const HeaderTitle = (props) => {
    return (
        <>
            <View style={{ ...androidStyle.TopBarItem, ...styles.mainView }}>
                <SingleIconButton
                    iconName='arrow-back-outline'
                    color='#fff'
                    onPress={props.backAction} />
                <Text category='h6' style={styles.text} status='control'>{props.title}</Text>
            </View>
            <Divider />
        </>
    )
}

export default React.memo(HeaderTitle)

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: primary,
        justifyContent: 'flex-start'
    },
    text: {
        paddingLeft: 12
    }
})