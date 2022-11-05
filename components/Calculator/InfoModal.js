import React, { useState } from 'react'
import { Modal } from 'react-native'
import SingleIconButton from '../_Stateless/SingleIconButton'
import CalculatorInfo from '../_Stateless/Calculator/CalculatorInfo'
import ModalTopBar from '../_Stateless/Calculator/ModalTopBar'
import { calculatorTypes } from '../../constants/constants'

const InfoModal = (props) => {
    const [visible, setVisisble] = useState(false)
    const hideModal = React.useCallback(() => setVisisble(false), [setVisisble])
    const showModal = React.useCallback(() => setVisisble(true), [setVisisble])


    if (props.display)
        return (
            <>
                <SingleIconButton
                    color='#fff'
                    iconName='question-mark-circle-outline'
                    onPress={showModal}
                />
                <Modal
                    visible={visible}
                    onRequestClose={hideModal}
                    onDismiss={hideModal}>
                    <ModalTopBar
                        onBackPress={hideModal}
                        title={`${calculatorTypes[props.calculatorType]?.title}`} />
                    <CalculatorInfo
                        calculatorType={props.calculatorType} />
                </Modal>
            </>
        )
    else return null
}

export default InfoModal