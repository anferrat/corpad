import React from 'react'
import { View, StyleSheet } from 'react-native'
import ReferenceCellSelectToken from './ReferenceCellSelectToken'


const ReferenceCellSelector = ({ referenceCells, referenceCellId, selectReferenceCell }) => {
    return (
        <View style={styles.container}>
            {referenceCells.map(({ name, id }) => (
                <ReferenceCellSelectToken
                    key={id}
                    title={name}
                    selected={referenceCellId === id}
                    id={id}
                    selectReferenceCell={selectReferenceCell}
                />
            ))}
        </View>
    )
}

export default ReferenceCellSelector

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
})