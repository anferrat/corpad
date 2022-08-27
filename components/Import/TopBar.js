import React from 'react'
import { View, StyleSheet } from 'react-native'
import SingleIconButton from '../_Stateless/SingleIconButton'
import { androidStyle, basic200 } from '../../styles/GlobalStyle'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from '@ui-kitten/components'

const TopBar = (props) => {
    return (
        <SafeAreaView style={{ ...androidStyle.TopBar, paddingBottom: 6, elevation: 5, borderBottomWidth: 1, borderBottomColor: basic200 }} edges={['top']}>
            <View style={styles.leftView}>
                <SingleIconButton
                    style={styles.icon}
                    onPress={props.goBack}
                    iconName='arrow-back-outline' />
                <Text category='h5'>Import CSV</Text>
            </View>
        </SafeAreaView>
    )
}

export default TopBar

const styles = StyleSheet.create({
    icon: {
        marginRight: 12,
    },
    leftView:
    {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    }
})