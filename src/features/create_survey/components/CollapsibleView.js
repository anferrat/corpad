import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { primary } from '../../../styles/colors'
import Pressable from '../../../components/Pressable'

const CollapsibleView = ({ children, visible, toggleView }) => {
    return (
        <>
            <Pressable
                style={styles.mainView}
                onPress={toggleView}>
                <Icon
                    name={visible ? 'arrow-ios-upward' : 'arrow-ios-downward'}
                    style={styles.icon}
                    fill={primary} />
                <Text status='primary'>
                    {!visible ? 'More' : 'Less'} options ...
                </Text>
            </Pressable>
            {visible ?
                <View>
                    {children}
                </View> : null}
        </>
    )
}

export default React.memo(CollapsibleView)


const styles = StyleSheet.create({
    icon: {
        width: 25,
        height: 25,
        marginRight: 12
    },
    mainView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        marginVertical: 12,
    }
})