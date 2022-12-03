import React from 'react'
import { Layout } from '@ui-kitten/components'
import InputField from '../../InputField'
import ShuntView from '../ShuntView'
import MultiSelectConnectionCardField from '../MultiSelectConnectionCardField'
import CurrentDirection from '../../components/CurrentDirection'
import CurrentDirectionHint from '../CurrentDirectionHint'

const selectedTypes = ['PL', 'AN', 'OT'] // types that can be used as side in SH

const SHCard = (props) => {
    return (
        <>
            <InputField
                maxLength={40}
                value={props.cardData.name}
                valid={props.cardData.valid.name}
                property='name'
                label='Name'
                placeholder={props.cardData.defaultName} />
            <Layout style={{ flexDirection: 'row' }}>
                <Layout style={{ flex: 1, paddingRight: 6 }}>
                    <MultiSelectConnectionCardField
                        selectedTypes={selectedTypes}
                        cardList={props.cardList}
                        property={'sideA'}
                        selectedCards={props.cardData.sideA}
                        label={'Side A'} />
                </Layout>
                <Layout style={{ justifyContent: 'center', paddingTop: 10 }}>
                    <CurrentDirection
                        fromAtoB={props.cardData.fromAtoB} />
                </Layout>
                <Layout style={{ flex: 1, paddingLeft: 6 }}>
                    <MultiSelectConnectionCardField
                        selectedTypes={selectedTypes}
                        cardList={props.cardList}
                        property={'sideB'}
                        selectedCards={props.cardData.sideB}
                        label={'Side B'} />
                </Layout>
            </Layout>
            <CurrentDirectionHint
                fromAtoB={props.cardData.fromAtoB} />
            <ShuntView
                ratioVoltage={props.cardData.ratioVoltage}
                ratioCurrent={props.cardData.ratioCurrent}
                factor={props.cardData.factor}
                voltageDrop={props.cardData.voltageDrop}
                current={props.cardData.current}
                valid={props.cardData.valid}
                factorSelected={props.cardData.factorSelected} />
        </>
    )
}

export default React.memo(SHCard)