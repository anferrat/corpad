import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Text } from '@ui-kitten/components'


const Wrapper = ({ children, title }) => {
    return (
        <View
            style={styles.wrapper}>
            <Text
                category='s2'
                appearance='hint'
                style={styles.text}>{title}</Text>
            <View style={styles.scrollViewWrapper}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollView}
                    contentContainerStyle={styles.scroll}
                    horizontal={true}>
                    <View
                        style={styles.container}>
                        {children}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}


export default React.memo(Wrapper)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        marginLeft: 12
    },
    scroll: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    scrollView: {
        alignSelf: 'center',
        height: 100,
    },
    wrapper: {
        flex: -1,
        marginTop: 24,
        justifyContent: 'center',
    },
    scrollViewWrapper: {
        height: 60,
    },
    text: {
        paddingLeft: 12
    }
})