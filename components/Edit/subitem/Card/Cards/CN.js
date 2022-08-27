import React from 'react'
import { View, StyleSheet } from 'react-native'
import LoaderPotentials from '../Potentials/LoaderPotentials'
import WireView from '../WireView'
import InputField from '../../InputField'
import { couponTypes } from '../../../../../constants/constants'
import SelectField from '../../SelectField'
import CurrentDensityView from '../CurrentDensityView'

const CNCard = (props) => {
    const attachmentList = React.useMemo(() => props.cardList.filter(card => card.type === 'PL' || card.type === 'RS'), [props.cardList])
    const resultList = React.useMemo(() => attachmentList.map(card => card.id), [attachmentList])
    const itemsList = React.useMemo(() => attachmentList.map(card => card.name), [attachmentList])
    const selectedItem = React.useMemo(() => {
        const index = attachmentList.findIndex(card => card.id === props.cardData.pipelineCardId)
        return index !== -1 ? index : null
    }, [attachmentList, props.cardData.pipelineCardId])
    return (
        <>
            <InputField
                maxLength={40}
                value={props.cardData?.name}
                valid={props.cardData?.valid?.name}
                property='name'
                label='Name'
                placeholder={props.cardData.defaultName} />
            <LoaderPotentials
                cardId={props.cardData.id}
                referenceCellList={props.referenceCellList} />
            <View style={styles.mainView}>
                <View style={styles.leftSide}>
                    <SelectField
                        resultList={resultList}
                        property='pipelineCardId'
                        itemsList={itemsList}
                        selectedItem={selectedItem}
                        placeholder="Disconnected"
                        label='Pipeline lead' />
                </View>
                <View style={styles.rightSide}>
                    <SelectField
                        property='couponType'
                        itemsList={couponTypes}
                        selectedItem={props.cardData.couponType}
                        placeholder="Type"
                        label='Coupon type' />
                </View>
            </View>
            <CurrentDensityView
                currentUnit={props.cardData?.currentUnit}
                current={props.cardData?.current}
                area={props.cardData?.area}
                valid={props.cardData?.valid}
                density={props.cardData?.density}
            />
            <WireView
                selectedColor={props.cardData.wireColor}
                selectedGauge={props.cardData.wireGauge} />
        </>
    )
}

export default React.memo(CNCard)

const styles = StyleSheet.create({
    leftSide: {
        flex: 1,
        marginRight: 6
    },
    rightSide: {
        flex: .5,
        marginLeft: 6
    },
    mainView: {
        flexDirection: 'row'
    }
})