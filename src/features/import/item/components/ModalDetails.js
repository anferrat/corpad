import React from 'react'
import Header from '../../../../components/Header'

const ModalDetails = ({ hideModal }) => {
    return (
        <Header
            title={'Import details'}
            onBackPress={hideModal}
        />
    )
}
export default ModalDetails