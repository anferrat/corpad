import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Header from '../../components/Header'
import SmartDivider from '../../components/Divider'
import InputField from '../../InputField'
import ToggleField from '../../ToggleField'
import TextLine from '../../components/TextLine'
import { getValue } from '../../../../helpers/functions'
import { isolationAssemblyTypes } from '../../../../constants/constants'
import SidesDisplay from '../../components/SidesDisplay'


const IK = (props) => {
    const [current, setCurrent] = useState(props.cardData.current)
    const [displayCurrent, setDisplayCurrent] = useState(props.cardData.current)
    const [shorted, setShorted] = useState(props.cardData.shorted)

    useEffect(() => {
        if (!shorted) {
            setCurrent('')
            setDisplayCurrent(null)
        }
    }, [shorted])

    return (
        <>
            <Header
                title={props.cardData?.name}
                icon={props.cardData?.type}
                onPressEdit={props.navigateToEditSubitem} />
            <SmartDivider depend={[true]} />
            <SidesDisplay
                displayValue={displayCurrent === null || displayCurrent === '' ? null : displayCurrent.toFixed(2) + ' A'}
                fromAtoB={props.cardData.fromAtoB}
                cardList={props.cardList}
                isolated={!shorted}
                sideATitle='Side A'
                sideBTitle='Side B'
                sideA={props.cardData.sideA}
                sideB={props.cardData.sideB} />
            <SmartDivider depend={[props.cardData.sideA.length !== 0, props.cardData.sideA.length !== 0]} />
            <TextLine title='Isolation type' value={getValue(props.cardData.isolationType, isolationAssemblyTypes)} hideEmpty />
            <View style={styles.shortedView}>
                <ToggleField
                    style={styles.toggle}
                    status={shorted ? 'danger' : 'primary'}
                    checked={!!shorted}
                    setValue={setShorted}
                    property='shorted'
                    dataTypeItem='TEST_POINT'
                    dataTypeSubitem='CARD'
                    itemId={props.itemId}
                    subitemId={props.cardData.id}
                    title='Shorted' />
                <View style={shorted ? styles.input : styles.inputHidden}>
                    <InputField
                        dataTypeItem='TEST_POINT'
                        dataTypeSubitem='CARD'
                        keyboardType='numeric'
                        itemId={props.itemId}
                        subitemId={props.cardData.id}
                        value={current === '' ? 0 : current}
                        setValue={setCurrent}
                        onEndEditing={setDisplayCurrent}
                        property='current'
                        label='Current'
                        unit={'A'} />
                </View>
            </View>
        </>
    )
}
export default IK

const styles = StyleSheet.create({
    shortedView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    input: {
        display: 'flex',
        marginLeft: 24,
        flex: 1
    },
    inputHidden: {
        display: 'none',
    },
    toggle: {
        height: 75
    }
})
