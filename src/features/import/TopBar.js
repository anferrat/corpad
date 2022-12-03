import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import { Text } from '@ui-kitten/components'
import SingleIconButton from '../../components/IconButton'
import { basic200 } from '../../styles/colors'
import { SafeAreaView } from 'react-native-safe-area-context'

const TopBar = (props) => {
    return (
        <SafeAreaView style={styles.mainView} edges={['top']}>
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
    },
    mainView: {
        height: StatusBar.currentHeight + 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        paddingBottom: 6,
        elevation: 5,
        borderBottomWidth: 1,
        borderBottomColor: basic200
    }
})