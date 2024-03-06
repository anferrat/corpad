import React from 'react'
import { View, StyleSheet } from 'react-native'
import ItemFactory from './components/ItemFactory'
import SubitemFactory from './components/SubitemFactory'


export const ItemView = ({ item, pipelines, referenceCells, potentialTypes, potentialUnit }) => {
    const subitemIdMap = new Map(item.subitems.map(subitem => ([subitem.id, subitem])))
    return (
        <View style={styles.container}>
            <View style={styles.itemView}>
                <ItemFactory
                    {...item} />
            </View>
            {item.subitems.map((subitem) =>
                <View
                    key={subitem.id}
                    style={styles.subitemView}>
                    <SubitemFactory {...subitem}
                        subitemIdMap={subitemIdMap}
                        potentialUnit={potentialUnit}
                        pipelines={pipelines}
                        potentialTypes={potentialTypes}
                        referenceCells={referenceCells}
                    />
                </View>)}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    subitemView: {
        marginBottom: 12
    },
    itemView: {
        padding: 12
    }
})