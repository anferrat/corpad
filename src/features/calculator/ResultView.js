import React from 'react'
import WennerResult from './components/WennerResult'
import ResultViewWrapper from './components/ResultViewWrapper'
import ResultRow from './components/ResultRow'
import CoatingQuality from './components/CoatingQuality'
import { CalculatorTypes } from '../../constants/global'
import { CalculatorTypeIconPacks, CalculatorTypeIcons } from '../../constants/icons'

const ResultComponent = (props) => {
    switch (props.calculatorType) {
        case CalculatorTypes.WENNER:
            return <WennerResult {...props} />
        case CalculatorTypes.SHUNT:
        case CalculatorTypes.CURRENT_TWO_WIRE:
        case CalculatorTypes.CURRENT_FOUR_WIRE:
        case CalculatorTypes.REFERENCE_CELL:
            return <ResultRow
                icon={CalculatorTypeIcons[props.calculatorType]}
                pack={CalculatorTypeIconPacks[props.calculatorType]}
                title={props.result.title}
                results={props.result.values} />
        case CalculatorTypes.COATING:
            return <>
                <ResultRow
                    icon={CalculatorTypeIcons[props.calculatorType]}
                    pack={CalculatorTypeIconPacks[props.calculatorType]}
                    title={props.result.title}
                    results={props.result.values} />
                <CoatingQuality
                    coatingQuality={props.result.coatingQuality} />
            </>
        default:
            return null
    }
}

const ResultView = (props) => {
    return (
        <ResultViewWrapper {...props}>
            <ResultComponent
                result={props.result}
                calculatorType={props.calculatorType} />
        </ResultViewWrapper>
    )
}

export default ResultView