import React from 'react'
import { View, StyleSheet } from 'react-native'
import PotentialTypeSelectorToken from './PotentialTypeSelectorToken'


const PotentialTypeSelector = ({ potentialTypes, potentialTypeIdList, togglePotentialType }) => {
    return (
        <View style={styles.container}>
            {potentialTypes.map(({ name, id }) => (
                <PotentialTypeSelectorToken
                    key={id}
                    title={name}
                    id={id}
                    selected={~potentialTypeIdList.indexOf(id)}
                    togglePotentialType={togglePotentialType}
                />
            ))}
        </View>
    )
}

export default PotentialTypeSelector

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 12
    },
})