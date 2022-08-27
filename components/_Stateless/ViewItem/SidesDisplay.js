import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import SingleSideDisplay from './SingleSideDisplay'
import { StyleSheet, View } from 'react-native'
import { basic, danger } from '../../../styles/GlobalStyle'

const SidesDisplay = (props) => {
    const getSideCardList = (sideIdList, cardList) => sideIdList?.map(cardId => cardList?.find(card => card?.id === cardId))
    const sideAList = getSideCardList(props.sideA, props.cardList)
    const sideBList = getSideCardList(props.sideB, props.cardList)
    if (props.sideA.length !== 0 || props.sideB.length !== 0)
        return (
            <View style={styles.mainView}>
                <View style={styles.side}>
                    <SingleSideDisplay title='Side A' sideCardList={sideAList} />
                </View>
                <View style={styles.iconView}>
                    <Text
                        status={(props.isolated !== undefined && !props.isolated) ? 'danger' : 'primary'}
                        category='p2'>
                        {props.displayValue}
                    </Text>
                    <DisplayedIcon isolated={props.isolated} fromAtoB={props.fromAtoB} />
                </View>
                <View style={styles.side}>
                    <SingleSideDisplay title='Side B' sideCardList={sideBList} />
                </View>
            </View>
        )
    else return null
}



const DisplayedIcon = React.memo((props) => {
    if (props.isolated === undefined || !props.isolated)
        return <Icon
            name={props.fromAtoB ? 'arrow-forward-outline' : 'arrow-back-outline'}
            fill={(props.isolated !== undefined && !props.isolated) ? danger : basic}
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