import React, { useContext } from 'react'
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native'
import { globalStyle } from '../../../../styles/styles'
import LoadingView from '../../../../components/LoadingView'
import BottomButton from '../../../../components/BottomButton'
import CycleSelectionView from './components/CycleSelectionView'
import CaptureModeView from './components/CaptureModeView'
import { MultimeterSettingContext, MultimeterSettingProvider } from './context/MultimeterSettings'
import HeaderView from './components/HeaderView'
import ErrorView from './components/ErrorView'
import { translateMultimeterSettings } from '../../../../localization'


const MultimeterSettings = ({ }) => {
    return (
        <MultimeterSettingProvider>
            <MultimeterSettingComponent />
        </MultimeterSettingProvider>
    )
}

export default MultimeterSettings

const MultimeterSettingComponent = () => {
    const { isLoading, onSaveHandler, scrollViewRef } = useContext(MultimeterSettingContext)
    return (
        <>
            <KeyboardAvoidingView
                behavior='padding'>
                <ScrollView
                    ref={scrollViewRef}
                    enableOnAndroid={true}
                    enableResetScrollToCoords={false}
                    extraScrollHeight={150}
                    contentContainerStyle={styles.scrollView}>
                    <View
                        style={globalStyle.card_noPadding}>
                        <View
                            style={styles.container}>
                            <LoadingView
                                loading={isLoading}>
                                <ErrorView />
                                <HeaderView />
                                <CycleSelectionView />
                                <CaptureModeView />
                            </LoadingView>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <BottomButton
                onPress={onSaveHandler}
                title={translateMultimeterSettings('save')}
                icon={'save'}
            />
        </>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        paddingBottom: 72
    },
    container: {
        minHeight: 300,
        paddingHorizontal: 12,
        paddingTop: 12
    },
    captureText: {
        paddingBottom: 12
    },
    main: {
        flex: 1,
        height: '100%'
    }
})
