import React from 'react'
import { Layout } from '@ui-kitten/components'
import InputField from '../../InputField'
import MultiSelectConnectionCardField from '../MultiSelectConnectionCardField'
import CurrentDirection from '../CurrentDirection'
import CurrentDirectionHint from '../CurrentDirectionHint'


const selectedTypes = ['PL', 'AN', 'RS', 'FC'] // types that can be used as side for BD card
const BDCard = (props) => {
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
            <InputField
                value={props.cardData.current}
                valid={props.cardData.valid.current}
                maxLength={8}
                keyboardType='numeric'
                unit={'A'}
                property='current'
                label='Bond current' />
        </>
    )
}

export default React.memo(BDCard)