import React from 'react'
import { StyleSheet, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SingleIconButton from '../../../components/IconButton'
import { primary, basic200 } from '../../../styles/colors'
import TopBarTitle from '../../../components/ItemTitle'


const SpreadsheetHeader = ({ navigation, route }) => {
    const { title } = route.params
    return (
        <SafeAreaView style={styles.mainView} edges={['top']}>
            <SingleIconButton
                style={styles.icon}
                color='#fff'
                iconName='arrow-back-outline'
                onPress={navigation.goBack} />
            <TopBarTitle
                control
                title={title ?? 'Data file'}
                subtitle='.csv file preview' />
        </SafeAreaView >
    )
}

export default React.memo(SpreadsheetHeader)

const styles = StyleSheet.create({
    mainView: {
        height: StatusBar.currentHeight + 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        backgroundColor: primary,
        paddingBottom: 6,
        elevation: 5,
        borderBottomWidth: 1,
        borderBottomColor: basic200
    },
    icon: {
        marginRight: 12
    }
})