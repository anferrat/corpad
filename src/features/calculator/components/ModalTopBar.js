import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import { primary } from '../../../styles/colors'
import SingleIconButton from '../../../components/IconButton'
import { SafeAreaView } from 'react-native-safe-area-context'

const ModalTopBar = (props) => {
    return (
        <SafeAreaView style={styles.topBarBackground}>
            <View style={styles.topBar}>
                <SingleIconButton
                    color='#fff'
                    iconName='arrow-back-outline'
                    onPress={props.onBackPress} />
                <Text category='h5' status='control' style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>{props.title}</Text>
            </View>
        </SafeAreaView>
    )
}

export default React.memo(ModalTopBar)

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    topBarBackground: {
        minHeight: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        backgroundColor: primary,
    },
    title: {
        paddingLeft: 12,
        flex: 1
    },
})