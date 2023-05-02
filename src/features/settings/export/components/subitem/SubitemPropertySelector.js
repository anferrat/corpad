import React from 'react'
import { View, StyleSheet } from 'react-native'
import SubitemPropertyToggleToken from './SubitemPropertyToggleToken'
import SubitemTitle from './SubitemTitle'


const SubitemPropertySelector = ({ selected, properties, subitemType, toggleSubitemProperty }) => {
    return (
        <View style={styles.parent}>
            <SubitemTitle
                subitemType={subitemType} />
            <View style={styles.container}>
                {properties.map(property => (
                    <SubitemPropertyToggleToken
                        key={property}
                        selected={selected}
                        property={property}
                        subitemType={subitemType}
                        onPress={toggleSubitemProperty} />
                ))}
            </View>
        </View>
    )
}

export default SubitemPropertySelector

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    parent: {
        marginBottom: 12
    }
})