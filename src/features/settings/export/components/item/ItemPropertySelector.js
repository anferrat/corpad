import React from 'react'
import { View, StyleSheet } from 'react-native'
import ItemPropertyToggleToken from './ItemPropertyToggleToken'
import LoadingView from '../../../../../components/LoadingView'


const ItemPropertySelector = ({ itemProperties, properties, toggleItemProperty, loading }) => {
    return (
        <View style={styles.container}>
            <LoadingView
                loading={loading}
                style={styles.loading}>
                {properties.map(property => (
                    <ItemPropertyToggleToken
                        key={property}
                        itemProperties={itemProperties}
                        property={property}
                        toggleToken={toggleItemProperty} />
                ))}
            </LoadingView>
        </View>
    )
}

export default ItemPropertySelector

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    loading: {
        minHeight: 150
    }
})