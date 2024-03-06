import React, { useCallback, useMemo } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import Select from '../../../../../components/Select'


const MatchItem = ({ titleIndex, title, itemList, onSelect, selectedIndex, accessoryList }) => {
    const onSelectHandler = useCallback((index) => {
        onSelect(titleIndex, index)
    }, [titleIndex, onSelect])
    return (
        <View style={styles.container}>
            <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.text}>
                {titleIndex + 1}. {title}:
            </Text>
            <Select
                style={styles.select}
                accessoryList={accessoryList}
                selectedIndex={selectedIndex}
                itemList={itemList}
                onSelect={onSelectHandler}
                placeholderOption={false}
            />
        </View>
    )
}

export default MatchItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingBottom: 12
    },
    select: {
        flex: 1.5
    },
    text: {
        flex: 1
    }
})