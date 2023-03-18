import React, { useState } from 'react'
import TextLine from '../../components/TextLine'
import Header from '../../components/Header'
import PotentialsView from '../../components/PotentialsView'
import { couponTypes } from '../../../../constants/constants'
import { getValue, calculateCouponDensity } from '../../../../helpers/functions'
import SmartDivider from '../../components/Divider'
import InputField from '../../InputField'
import { sendRequest } from '../../../../api/database/index'
import { errorHandler } from '../../../../helpers/error_handler'

const getCardName = (cardList, cardId) => {
    if (cardList !== undefined && cardId !== undefined) {
        const cardIndex = cardList?.findIndex(card => card.id === cardId)
        if (cardIndex === -1 || cardId === null)
            return 'Disconnected'
        else return cardList[cardIndex].name
    }
    else return 'Error'
}

const areaUnit = {
    main: 'cm',
    script: '2',
    format: 'super'
}

const densityUnit = {
    main: 'A/m',
    script: '2',
    format: 'super'
}

const CN = (props) => {
    const [current, setCurrent] = useState(props.cardData.current)
    const [density, setDensity] = useState(props.cardData.density)
    const updateDensity = React.useCallback(async (current, area) => {
        const density = calculateCouponDensity(current, area)
        const updateRequest = await sendRequest('UPDATE', 'CARD_PROPERTY', { cardId: props.cardData.id, value: density, property: 'density' })
        if (updateRequest.status === 200)
            setDensity(density)
        else errorHandler(623)
    }, [])
    return (
        <>
            <Header
                wireColor={props.cardData?.wireColor}
                wireGauge={props.cardData?.wireGauge}
                title={props.cardData?.name}
                icon={props.cardData?.type}
                onPressEdit={props.navigateToEditSubitem} />
            <SmartDivider depend={[true]} />
            <PotentialsView
                itemId={props.itemId}
                potentials={props.cardData.potentials}
                unit={props.defaultPotentialUnit}
                referenceCellList={props.referenceCellList} />
            <TextLine title='Connected to' value={getCardName(props.cardList, props.cardData.pipelineCardId)} hideEmpty />
            <TextLine title='Type' value={getValue(props.cardData.couponType, couponTypes)} hideEmpty />
            <TextLine
                title='Area'
                value={props.cardData.area}
                unit={areaUnit} hideEmpty />
            <TextLine
                title='Density'
                value={density}
                unit={densityUnit} hideEmpty />
            <InputField
                onEndEditing={updateDensity.bind(this, current, props.cardData.area)}
                dataTypeItem='TEST_POINT'
                dataTypeSubitem='CARD'
                keyboardType='numeric'
                itemId={props.itemId}
                subitemId={props.cardData.id}
                value={current}
                setValue={setCurrent}
                title='Current'
                property='current'
                unit={'\u00B5A'}
            />
        </>
    )
}
export default CN