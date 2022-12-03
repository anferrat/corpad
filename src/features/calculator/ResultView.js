import React from 'react'
import WennerResult from './components/WennerResult'
import ResultViewWrapper from './components/ResultViewWrapper'
import ResultRow from './components/ResultRow'
import { calculatorTypes } from '../../constants/constants'
import CoatingQuality from './components/CoatingQuality'

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