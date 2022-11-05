import React from 'react'
import WennerResult from '../_Stateless/Calculator/WennerResult'
import ResultViewWrapper from '../_Stateless/Calculator/ResultViewWrapper'
import ResultRow from '../_Stateless/Calculator/ResultRow'
import { calculatorTypes } from '../../constants/constants'
import CoatingQuality from '../_Stateless/Calculator/CoatingQuality'

const ResultComponent = (props) => {
    switch (props.calculatorType) {
        case 'wenner':
            return <WennerResult {...props} />
        case 'shunt':
        case 'current2Wire':
        case 'current4Wire':
        case 'refCell':
            return <ResultRow
                icon={calculatorTypes[props.calculatorType].icon}
                pack={calculatorTypes[props.calculatorType].pack}
                title={props.result.title}
                results={props.result.values}
            />
        case 'coating':
            return <>
                <ResultRow
                    icon={calculatorTypes[props.calculatorType].icon}
                    pack={calculatorTypes[props.calculatorType].pack}
                    title={props.result.title}
                    results={props.result.values}
                />
                <CoatingQuality coatingQuality={props.result.coatingQuality} />
            </>
        default:
            return null
    }
}

const ResultView = (props) => {
    return (
        <ResultViewWrapper {...props}>
            <ResultComponent result={props.result} calculatorType={props.calculatorType} />
        </ResultViewWrapper>
    )
}

export default ResultView