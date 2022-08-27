import { Icon, Text } from '@ui-kitten/components'
import React, { useState } from 'react'
import { StyleSheet, Pressable, View } from 'react-native'
import { basic200, primary } from '../../../styles/GlobalStyle'


const MoreOptions = (props) => {
    const [expanded, setExpanded] = useState(false)
    return (
        <>
            <Pressable style={styles.mainView} onPress={setExpanded.bind(this, !expanded)}>
                <Icon name={expanded ? 'arrow-ios-upward' : 'arrow-ios-downward'} style={styles.icon} fill={primary} />
                <Text status='primary'>{!expanded ? 'More' : 'Less'} options ...</Text>
            </Pressable>
            <View style={expanded ? styles.options : styles.hidden}>
                {props.children}
            </View>
        </>
    )
}

export default React.memo(MoreOptions)


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
    },
    options: {

    },
    hidden: {
        display: 'none'
    }
})