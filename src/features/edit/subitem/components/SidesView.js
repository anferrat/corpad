import React from 'react'
import { View, StyleSheet } from 'react-native'
import MultiSelectConnectionCardField from './MultiSelectConnectionCardField'
import CurrentDirection from './CurrentDirection'
import CurrentDirectionHint from './CurrentDirectionHint'

const SidesView = ({ sideA, sideB, fromAtoB, shorted, subitemList, selectedTypes, update }) => {
    return (
        <>
            <View style={styles.sides}>
                <View style={styles.select}>
                    <MultiSelectConnectionCardField
                        update={update}
                        selectedTypes={selectedTypes}
                        subitemList={subitemList}
                        property={'sideA'}
                        selectedIdList={sideA}
                        label={'Side A'} />
                </View>
                <View style={styles.direction}>
                    <CurrentDirection
                        update={update}
                        shorted={shorted}
                        fromAtoB={fromAtoB} />
                </View>
                <View style={styles.select}>
                    <MultiSelectConnectionCardField
                        update={update}
                        selectedTypes={selectedTypes}
                        subitemList={subitemList}
                        property={'sideB'}
                        selectedIdList={sideB}
                        label={'Side B'} />
                </View>
            </View>
            <CurrentDirectionHint
                update={update}
                shorted={shorted}
                fromAtoB={fromAtoB} />
        </>
    )
}

export default React.memo(SidesView)

const styles = StyleSheet.create({
    sides: {
        flexDirection: 'row'
    },
    direction: {
        justifyContent: 'center',
        paddingTop: 10,
        paddingHorizontal: 8
    },
    select: {
        flex: 1
    }
})