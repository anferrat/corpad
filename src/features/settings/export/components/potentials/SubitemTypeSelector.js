import React from 'react'
import { View, StyleSheet } from 'react-native'
import SubitemTypeSelectToken from './SubitemTypeSelectorToken'


const SubitemTypeSelector = ({ subitemTypes, selectedSubitemTypes, toggleSubitemType }) => {
    return (
        <View style={styles.container}>
            {subitemTypes.map((type) => (
                <SubitemTypeSelectToken
                    key={type}
                    type={type}
                    selected={~selectedSubitemTypes.indexOf(type)}
                    toggleSubitemType={toggleSubitemType}
                />
            ))}
        </View>
    )
}

export default SubitemTypeSelector

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 12
    },
})