import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import { androidStyle, primary } from '../../../styles/GlobalStyle'
import SingleIconButton from '../SingleIconButton'
import { Text } from '@ui-kitten/components'

const ModalTopBar = (props) => {
    return (
        <View style={{ ...androidStyle.TopBarItem, ...styles.topBarBackground }}>
            <View style={styles.topBar}>
                <SingleIconButton
                    color='#fff'
                    iconName='arrow-back-outline'
                    onPress={props.onBackPress} />
                <Text category='h5' status='control' style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>{props.title}</Text>
            </View>
        </View>
    )
}

export default React.memo(ModalTopBar)

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    topBarBackground: {
        backgroundColor: primary,
        paddingTop: 0,
        paddingBottom: 0,
        height: 60
    },
    title: {
        paddingLeft: 12,
        paddingBottom: 5,
        flex: 1
    },
})