import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from '@ui-kitten/components'
import { basic300 } from '../../../styles/colors'

const SelectTab = ({ selectedTabIndex, labels, onPress, visible }) => {
    if (visible)
        return (
            <View style={styles.container}>
                {labels.map((label, index) =>
                    <Button
                        onPress={onPress.bind(this, index)}
                        size='small'
                        style={index === selectedTabIndex ? styles.selectedTab : styles.tab}
                        appearance={'ghost'}
                        key={label}>
                        {label}
                    </Button>)}
            </View>
        )
    else return null
}

export default React.memo(SelectTab)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 12,
        marginHorizontal: 12
    },
    selectedTab: {
        backgroundColor: basic300,
        flex: 1
    },
    tab: {
        flex: 1
    }
})