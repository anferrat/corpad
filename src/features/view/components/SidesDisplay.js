import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import SingleSideDisplay from './SingleSideDisplay'
import { basic, danger } from '../../../styles/colors'

const getSideSubitems = (side, subitems) => side.map(id => subitems.find(subitem => subitem.id === id))

const SidesDisplay = ({ subitems, sideA, sideB, shorted, fromAtoB, visible }) => {

    const sideASubitems = React.useMemo(() => getSideSubitems(sideA, subitems), [sideA, subitems])
    const sideBSubitems = React.useMemo(() => getSideSubitems(sideB, subitems), [sideB, subitems])

   // const visible = sideA.length !== 0 || sideB.length !== 0

    if (visible)
        return (
            <View style={styles.mainView}>
                <View style={styles.side}>
                    <SingleSideDisplay
                        subitems={sideASubitems} />
                </View>
                <View style={styles.iconView}>
                    <Text
                        status={shorted ? 'danger' : 'primary'}
                        category='p2'>
                        {props.displayValue}
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
    else return null
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