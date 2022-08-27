import React from 'react'
import { Layout } from '@ui-kitten/components'
import InputField from '../../InputField'
import MultiSelectConnectionCardField from '../MultiSelectConnectionCardField'
import SelectField from '../../SelectField'
import CurrentDirection from '../CurrentDirection'
import IsolationView from '../IsolationView'
import { isolationAssemblyTypes } from '../../../../../constants/constants'
import CurrentDirectionHint from '../CurrentDirectionHint'

const selectedTypes = ['RS', 'FC'] // types that can be used as side for IK card
const IKCard = (props) => {
    return (
        <>
            <InputField
                maxLength={40}
                value={props.cardData.name}
                valid={props.cardData.valid.name}
                property='name'
                label='Name'
                placeholder={props.cardData.defaultName} />
            <Layout style={{ flexDirection: 'row', }}>
                <Layout style={{ flex: 1, paddingRight: 6 }}>
                    <MultiSelectConnectionCardField
                        selectedTypes={selectedTypes }
                        cardList={props.cardList}
                        property={'sideA'}
                        selectedCards={props.cardData.sideA}
                        label={'Side A'} />
                </Layout>
                <Layout style={{ justifyContent: 'center', paddingTop: 10 }}>
                    <CurrentDirection
                        fromAtoB={props.cardData.fromAtoB}
                        shorted={props.cardData.shorted} />
                </Layout>
                <Layout style={{ flex: 1, paddingLeft: 6 }}>
                    <MultiSelectConnectionCardField
                        selectedTypes={selectedTypes }
                        cardList={props.cardList}
                        property={'sideB'}
                        selectedCards={props.cardData.sideB}
                        label={'Side B'} />
                </Layout>
            </Layout>
            <CurrentDirectionHint
                fromAtoB={props.cardData.fromAtoB}
                shorted={props.cardData.shorted} />
            <SelectField
                property='isolationType'
                itemsList={isolationAssemblyTypes}
                selectedItem={props.cardData.isolationType}
                placeholder="Select type"
                label='Type' />
            <IsolationView
                shorted={props.cardData.shorted}
                current={props.cardData.current}
                valid={props.cardData.valid.current} />
        </>
    )
}

export default React.memo(IKCard)