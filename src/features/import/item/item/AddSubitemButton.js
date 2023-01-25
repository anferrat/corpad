import React, { useState, useContext } from 'react'
import { AddReadingModal } from "../../../../components/AddReadingModal"
import Button from '../components/Button'
import { ImportData } from '../ImportDataProvider'
import { useDispatch, useSelector } from 'react-redux'
import { getPotentialsData } from '../helpers/functions'
import { addSubitem } from '../../../../store/actions/importData'

const AddSubitemButton = () => {
    const { extraData, pushToSubitem } = useContext(ImportData)
    const itemType = useSelector(state => state.importData.itemType)
    const dispatch = useDispatch()
    const subitemCount = useSelector(state => state.importData.subitems.length)

    const addSubitemHandler = React.useCallback((type) => {
        const { autoCreate, init } = getPotentialsData(
            extraData.autoCreatePotentials,
            extraData.potentialTypes,
            extraData.referenceCellList)
        const newIndex = subitemCount
        dispatch(addSubitem(type, autoCreate, init))
        pushToSubitem(newIndex, type)

    }, [extraData, pushToSubitem, dispatch, subitemCount])
    const [visible, setVisible] = useState(false)
    const showModal = React.useCallback(() => setVisible(true), [])
    const hideModal = React.useCallback(() => setVisible(false), [])

    return (
        <>
            <Button
                showModal={showModal}
                itemType={itemType}
                onSelect={addSubitemHandler} />
            <AddReadingModal
                visible={visible}
                hideModal={hideModal}
                onSelect={addSubitemHandler}
            />
        </>
    )
}

export default React.memo(AddSubitemButton)