import React from 'react'
import NameInput from '../NameInput'
import ShuntView from '../ShuntView'
import SidesView from '../SidesView'

const selectedTypes = ['PL', 'AN', 'OT'] // types that can be used as side in SH

const SHCard = ({ data, subitemList, update, validate, updateRatioHandler, validateRatioHandler, updateFactorHandler, validateFactorHandler, validateVoltageDropHandler }) => {
    const { fromAtoB, sideA, sideB, name, defaultName, valid, ratioVoltage, ratioCurrent, factor, voltageDrop, current, factorSelected } = data
    return (
        <>
            <NameInput
                name={name}
                valid={valid.name}
                update={update}
                validate={validate}
                defaultName={defaultName} />
            <SidesView
                update={update}
                selectedTypes={selectedTypes}
                subitemList={subitemList}
                fromAtoB={fromAtoB}
                sideA={sideA}
                sideB={sideB} />
            <ShuntView
                update={update}
                updateRatioHandler={updateRatioHandler}
                validateRatioHandler={validateRatioHandler}
                updateFactorHandler={updateFactorHandler}
                validateFactorHandler={validateFactorHandler}
                validateVoltageDropHandler={validateVoltageDropHandler}
                ratioVoltage={ratioVoltage}
                ratioCurrent={ratioCurrent}
                factor={factor}
                voltageDrop={voltageDrop}
                current={current}
                valid={valid}
                factorSelected={factorSelected} />
        </>
    )
}

export default React.memo(SHCard)