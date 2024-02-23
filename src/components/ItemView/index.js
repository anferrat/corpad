import React from 'react'
import { View, StyleSheet } from 'react-native'
import ItemFactory from './components/ItemFactory'
import SubitemFactory from './components/SubitemFactory'


export const ItemView = ({ item, pipelines, referenceCells, potentialTypes }) => {
    return (
        <View style={styles.container}>
            <ItemFactory
                {...item} />
            {item.subitems.map((subitem) =>
                <SubitemFactory {...subitem}
                    key={subitem.id}
                    pipelines={pipelines}
                    potentialTypes={potentialTypes}
                    referenceCells={referenceCells}
                />)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
})