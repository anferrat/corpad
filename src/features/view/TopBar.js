import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavigationWidget from './NavigationWidget'
import Title from './Title'
import SingleIconButton from '../../components/IconButton'
import { basic300 } from '../../styles/colors'


const TopBar = React.forwardRef((props, ref) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.mainView}>
                <SingleIconButton
                    iconName='arrow-back-outline'
                    onPress={props.goBack} />
                <Title
                    ref={ref}
                    dataType={props.dataType} />
            </View>
            <NavigationWidget />
        </SafeAreaView>
    )
})

export default React.memo(TopBar)

const styles = StyleSheet.create({
    mainView:
    {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    safeArea: {
        height: StatusBar.currentHeight + 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        paddingBottom: 6,
        elevation: 5,
        borderBottomWidth: 1,
        borderBottomColor: basic300
    }
})