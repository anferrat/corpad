import React, { useState } from 'react'
import Header from '../../components/Header'
import SmartDivider from '../../components/SmartDivider'
import InputField from '../../InputField'
import SidesDisplay from '../../components/SidesDisplay'

const displayDivider = [true]

const BD = (props) => {
    const [current, setCurrent] = useState(props.cardData.current)
    const [displayCurrent, setDisplayCurrent] = useState(props.cardData.current)
    const dividerDepend = React.useMemo(() => [props.cardData.sideA.length !== 0, props.cardData.sideB.length !== 0], [props.cardData.sideA.length, props.cardData.sideB.length])
    return (
        <>
            <Header
                title={props.cardData?.name}
                icon={props.cardData?.type}
                onPressEdit={props.navigateToEditSubitem} />
            <SmartDivider depend={displayDivider} />
            <SidesDisplay
                displayValue={displayCurrent === '' || displayCurrent === null ? null : displayCurrent.toFixed(2) + ' A'}
                displayUnit='A'
                fromAtoB={props.cardData.fromAtoB}
                cardList={props.cardList}
                sideATitle='Side A'
                sideBTitle='Side B'
                sideA={props.cardData.sideA}
                sideB={props.cardData.sideB} />
            <SmartDivider depend={dividerDepend} />
            <InputField
                dataTypeItem='TEST_POINT'
                dataTypeSubitem='CARD'
                keyboardType='numeric'
                itemId={props.itemId}
                subitemId={props.cardData.id}
                value={current}
                setValue={setCurrent}
                title='Current'
                onEndEditing={setDisplayCurrent}
                property='current'
                unit={'A'} />
        </>
    )
}
export default BD