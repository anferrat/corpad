import React from 'react'
import { View, StyleSheet } from 'react-native'
import PotentialsView from '../potentials/PotentialsView'
import WireView from '../WireView'
import Select from '../../../../../components/Select'
import CurrentDensityView from '../CurrentDensityView'
import NameInput from '../NameInput'
import { CouponTypes } from '../../../../../constants/global'
import { CouponTypeLabels } from '../../../../../constants/labels'

const couponAttachmentTypes = ['PL', 'RS']

const couponTypes = Object.values(CouponTypes).map(type => ({ item: CouponTypeLabels[type], index: type }))

const CNCard = ({ subitemList, itemId, subitemId, data, update, validate, validateCouponHandler }) => {

    const { pipelineCardId, name, defaultName, couponType, current, area, density, wireColor, wireGauge, valid } = data

    const itemList = React.useMemo(() =>
        subitemList.filter(({ type }) => ~couponAttachmentTypes.indexOf(type))
            .map(({ id, name, type }) => ({ item: name, id, type })),
        [subitemList])

    const selectedIndex = React.useMemo(() => {
        const index = itemList.findIndex(({ id }) => id === pipelineCardId)
        return ~index ? index : null
    }, [itemList, pipelineCardId])

    const onSelectPipeline = React.useCallback((index) => {
        update(itemList[index]?.id ?? null, 'pipelineCardId')
    }, [itemList, update])

    const onSelectType = React.useCallback((index) => {
        update(index, 'couponType')
    }, [update])

    return (
        <>
            <NameInput
                name={name}
                valid={valid.name}
                defaultName={defaultName}
                update={update}
                validate={validate} />
            <PotentialsView
                subitemId={subitemId}
                itemId={itemId} />
            <View style={styles.mainView}>
                <View style={styles.leftSide}>
                    <Select
                        onSelect={onSelectPipeline}
                        property='pipelineCardId'
                        itemList={itemList}
                        selectedIndex={selectedIndex}
                        placeholder="Disconnected"
                        placeholderOption={true}
                        label='Connected to' />
                </View>
                <View style={styles.rightSide}>
                    <Select
                        placeholderOption={true}
                        onSelect={onSelectType}
                        property='couponType'
                        itemList={couponTypes}
                        selectedIndex={couponType}
                        placeholder="Type"
                        label='Coupon type' />
                </View>
            </View>
            <CurrentDensityView
                update={update}
                validate={validateCouponHandler}
                current={current}
                area={area}
                density={density}
                areaValid={valid.area}
                currentValid={valid.current} />
            <WireView
                update={update}
                wireColor={wireColor}
                wireGauge={wireGauge} />
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
        flexDirection: 'row',
        paddingBottom: 12
    }
})