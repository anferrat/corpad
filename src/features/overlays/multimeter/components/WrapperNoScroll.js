import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Text } from '@ui-kitten/components'


const WrapperNoScroll = ({ children, title }) => {
    return (
        <View
            style={styles.wrapper}>
            <Text
                category='s2'
                appearance='hint'
                style={styles.text}>{title}</Text>
            <View
                style={styles.scroll}>
                <ScrollView>
                    <View style={styles.scrollViewWrapper}>
                        {children}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}


export default React.memo(WrapperNoScroll)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginLeft: 12
    },
    scroll: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapper: {
        flex: -1,
        justifyContent: 'center',
    },
    scrollViewWrapper: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 12
    },
    text: {
        paddingLeft: 12
    }
})