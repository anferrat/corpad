import React from 'react'
import { View, StyleSheet, Modal, StatusBar } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import TopLine from './components/TopLine'
import usePaywall from './hooks/usePaywall'
import IconView from './components/IconView'
import TermsAndConditions from './components/TermsAndConditions'
import Title from './components/Title'
import ContentFactory from './components/ContentFactory'
import ActionButton from './components/ActionButton'

const edges = ['top', 'bottom', 'left', 'right']

const Paywall = () => {
    const { onClose, onPurchase, onRestore, onVerify, viewTermsAndConditions, visible, status, isUnavailable, price, processing, expirationTime } = usePaywall()

    return (
        <Modal
            animationType='slide'
            visible={visible}
            onRequestClose={onClose}
            statusBarTranslucent={true}>
            <SafeAreaProvider>

                <SafeAreaView
                    style={styles.container}
                    edges={edges}>
                    <TopLine
                        onClose={onClose} />
                    <IconView
                        status={status} />
                    <Title
                        status={status} />
                    <ContentFactory
                        expirationTime={expirationTime}
                        status={status} />
                    <View>
                        <ActionButton
                            price={price}
                            processing={processing}
                            isUnavailable={isUnavailable}
                            onPurchase={onPurchase}
                            onRestore={onRestore}
                            onVerify={onVerify}
                            status={status}
                            onClose={onClose} />
                        <TermsAndConditions
                            onPress={viewTermsAndConditions} />
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </Modal>
    )
}

export default Paywall

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    features: {
        marginHorizontal: 24,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginHorizontal: 12
    },

})