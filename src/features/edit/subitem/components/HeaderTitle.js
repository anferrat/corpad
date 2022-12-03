import { Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import { primary } from '../../../../styles/colors'
import SingleIconButton from '../../../../components/IconButton'

const HeaderTitle = (props) => {
    return (
        <View style={styles.mainView}>
            <SingleIconButton
                iconName='arrow-back-outline'
                color='#fff'
                onPress={props.backAction} />
            <Text category='h6' style={styles.text} status='control'>{props.title}</Text>
        </View>
    )
}

export default React.memo(HeaderTitle)

const styles = StyleSheet.create({
    mainView: {
        height: StatusBar.currentHeight + 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        backgroundColor: primary,
        justifyContent: 'flex-start',
        paddingTop: StatusBar.currentHeight
    },
    text: {
        paddingLeft: 12
    }
})