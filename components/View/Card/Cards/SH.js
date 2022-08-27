import React, { useState } from 'react'
import TextLine from '../../../_Stateless/TextLine'
import Header from '../../../_Stateless/ViewItem/Header'
import { currentCalculation } from '../../../customFunctions'
import SmartDivider from '../../../_Stateless/SmartDivider'
import SidesDisplay from '../../../_Stateless/ViewItem/SidesDisplay'
import InputField from '../../InputField'
import { sendRequest } from '../../../../database/db'
import { errorHandler } from '../../../errorHandler'

const SH = (props) => {
    const [voltageDrop, setVoltageDrop] = useState(props.cardData.voltageDrop)
    const [current, setCurrent] = useState(props.cardData.current)
    const shuntData = React.useMemo(() => getDisplayData(props.cardData.factorSelected, props.cardData.factor, props.cardData.ratioVoltage, props.cardData.ratioCurrent), [props.cardData.factorSelected, props.cardData.factor, props.cardData.ratioVoltage, props.cardData.ratioCurrent])

    const updateCurrent = React.useCallback(async (voltageDrop, factor) => {
        const c = currentCalculation(voltageDrop, factor)
        const updateRequest = await sendRequest('UPDATE', 'CARD_PROPERTY', { cardId: props.cardData.id, value: c, property: 'current' })
        if (updateRequest.status === 200)
            setCurrent(c)
        else errorHandler(623)
    }, [])
    return (
        <>
            <Header
                title={props.cardData?.name}
                icon={props.cardData?.type}
                onPressEdit={props.navigateToEditSubitem} />
            <SmartDivider depend={[true]} />
            <SidesDisplay
                displayValue={current === null ? null : current.toFixed(2) + ' A'}
                fromAtoB={props.cardData.fromAtoB}
                cardList={props.cardList}
                sideATitle='Side A'
                sideBTitle='Side B'
                sideA={props.cardData.sideA}
                sideB={props.cardData.sideB} />
            <SmartDivider depend={[props.cardData.sideA.length !== 0, props.cardData.sideB.length !== 0]} />
            <TextLine title={shuntData.title} value={shuntData.value} hideEmpty />
            <InputField
                dataTypeItem='TEST_POINT'
                dataTypeSubitem='CARD'
                keyboardType='numeric'
                itemId={props.itemId}
                subitemId={props.cardData.id}
                value={voltageDrop}
                setValue={setVoltageDrop}
                onEndEditing={updateCurrent.bind(this, voltageDrop, props.cardData.factor)}
                title='Voltage drop'
                property='voltageDrop'
                unit={'mV'} />
        </>
    )
}
export default SH

const getDisplayData = (factorSelected, factor, ratioVoltage, ratioCurrent) => {
    if (factorSelected)
        return {
            title: 'Factor',
            value: factor !== null ? factor + ' A/V' : null,
        }
    else if (ratioVoltage !== '' && ratioCurrent !== '')
        return {
            title: 'Shunt ratio',
            value: ratioVoltage !== null & ratioCurrent !== null ? ratioVoltage + ' mV - ' + ratioCurrent + ' A' : null,
        }
    else return {
        title: 'Shunt ratio',
        value: null,
    }
}