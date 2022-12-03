import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import { primary } from '../../../styles/colors'
import SingleIconButton from '../../../components/IconButton'

const ModalTopBar = (props) => {
    return (
        <View style={styles.topBarBackground}>
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
        height: 80,
        paddingBottom: 10,
        paddingTop: 30,
        flexDirection: 'row',
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        backgroundColor: '#fff',
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