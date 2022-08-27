import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { basic200, primary, basic } from '../../styles/GlobalStyle'

const ExpandableText = (props) => {
    return (
        <Pressable style={styles.view} onPress={props.onPress} android_ripple={{ color: basic }}>
            <View style={styles.subView}>
                <Text status='primary' style={styles.text} category={'p2'}>{props.expanded ? props.textExpanded : props.textHidden}</Text>
            </View>
            <Icon name={props.expanded ? 'arrow-ios-upward-outline' : 'arrow-ios-downward-outline'} style={styles.icon} fill={primary} />
        </Pressable>
    )
}


export default ExpandableText

const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
    },
    text: {
        fontWeight: 'bold',
        position: 'absolute',
        alignSelf: 'center'
    },
    subView: {
        marginLeft: 20,
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    view: {
        marginHorizontal: -12,
        backgroundColor: basic200,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 12,
        paddingVertical: 6
    }
})