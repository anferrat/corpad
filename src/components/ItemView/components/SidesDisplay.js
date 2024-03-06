import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import SingleSideDisplay from './SingleSideDisplay'
import { basic, danger } from '../../../styles/colors'

const getSideNames = (side, idMap) => side.map(id => idMap.get(id) ?? null).filter(subitem => subitem !== null)

const SidesDisplay = ({ idMap, sideA, sideB, shorted, fromAtoB, value }) => {

    const sideASubitems = React.useMemo(() => getSideNames(sideA, idMap), [sideA, idMap])
    const sideBSubitems = React.useMemo(() => getSideNames(sideB, idMap), [sideB, idMap])

    return (
        <View style={styles.mainView}>
            <View style={styles.side}>
                <SingleSideDisplay
                    subitems={sideASubitems} />
            </View>
            <View style={styles.iconView}>
                <Text
                    numberOfLines={1}
                    status={shorted ? 'danger' : 'primary'}
                    category='p2'>
                    {value}
                </Text>
                <CurrentIcon
                    shorted={shorted}
                    fromAtoB={fromAtoB} />
            </View>
            <View style={styles.side}>
                <SingleSideDisplay
                    subitems={sideBSubitems} />
            </View>
        </View>
    )

}



const CurrentIcon = React.memo(({ shorted, fromAtoB }) => {
    if (shorted || shorted === undefined)
        return <Icon
            name={fromAtoB ? 'arrow-forward-outline' : 'arrow-back-outline'}
            fill={shorted ? danger : basic}
            style={styles.icon} />
    else return <Icon
        name='IK'
        pack='cp'
        fill={basic}
        style={styles.icon} />
})

export default React.memo(SidesDisplay)

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        flex: 1,
        paddingVertical: 12,
    },
    side: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    icon: {
        width: 30,
        height: 30,
    },
    iconView: {
        flexBasis: 70,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 12
    }
})