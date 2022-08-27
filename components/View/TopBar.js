import React from 'react'
import NavigationWidget from './NavigationWidget'
import Title from './Title'
import { StyleSheet, View } from 'react-native'
import SingleIconButton from '../_Stateless/SingleIconButton'
import { androidStyle, basic300 } from '../../styles/GlobalStyle'
import { SafeAreaView } from 'react-native-safe-area-context'

const TopBar = React.forwardRef((props, ref) => {
    return (
        <SafeAreaView style={{ ...androidStyle.TopBar, paddingBottom: 6, elevation: 5, borderBottomWidth: 1, borderBottomColor: basic300 }}>
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
    }
})