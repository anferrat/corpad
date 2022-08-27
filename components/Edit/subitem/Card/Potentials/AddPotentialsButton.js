import React, { useState } from 'react'
import { Button } from '@ui-kitten/components'
import { addIcon } from '../../../../_Stateless/Icons'
import PotentialsTypeModal from './PotentialsTypeModal'
import ReferenceCellModal from './ReferenceCellModal'

const AddPotentialsButton = (props) => {
    const [selectReferenceVisible, setSelectReferenceVisible] = useState(false)
    const [potentialTypesVisible, setPotentialTypesVisible] = useState(false)
    const [selectedTypeIndex, setSelectedTypeIndex] = useState(null)
    const referenceCellList = React.useMemo(() => selectedTypeIndex === null ? props.referenceCellList : props.getReferenceCellList(props.potentialTypes[selectedTypeIndex].id), [selectedTypeIndex, props.potentialTypes, props.getReferenceCellList, props.referenceCellList])
    const onTypeSelectHandler = React.useCallback((potentialTypeIndex) => {
        if (props.referenceCellList.length === 1) {
            props.addPotentialHandler(props.potentialTypes[potentialTypeIndex].name, props.referenceCellList[0].id, props.referenceCellList[0].isPortable, props.potentialTypes[potentialTypeIndex].id)
        }
        else {
            setSelectedTypeIndex(potentialTypeIndex)
            setSelectReferenceVisible(true)
        }
    }, [setSelectedTypeIndex, setSelectReferenceVisible, props.addPotentialHandler, referenceCellList, props.potentialTypes])

    const onReferenceSelectHandler = React.useCallback((refCellId, isPortable) => {
        props.addPotentialHandler(props.potentialTypes[selectedTypeIndex].name, refCellId, isPortable, props.potentialTypes[selectedTypeIndex].id)
        setSelectedTypeIndex(null)
    }, [props.addPotentialHandler, selectedTypeIndex, props.potentialTypes, setSelectedTypeIndex])

    const onDismissReference = React.useCallback(() => {
        setSelectReferenceVisible(false)
    }, [setSelectReferenceVisible])

    const onDismissPotentialType = React.useCallback(() => {
        setPotentialTypesVisible(false)
    }, [setPotentialTypesVisible])

    if (!props.referenceCellList)
        return null
    else
        return (
            <>
                <Button
                    disabled={props.potentialTypes.length === 0}
                    onPress={setPotentialTypesVisible.bind(this, true)}
                    appearance='ghost'
                    accessoryLeft={addIcon}>
                    Add potentials
                </Button>
                <PotentialsTypeModal
                    visible={potentialTypesVisible}
                    dismiss={onDismissPotentialType}
                    potentialTypes={props.potentialTypes}
                    setPotentialType={onTypeSelectHandler} />
                <ReferenceCellModal
                    visible={selectReferenceVisible}
                    dismiss={onDismissReference}
                    referenceCellList={referenceCellList}
                    onReferenceSelectHandler={onReferenceSelectHandler}
                />
            </>
        )
}

export default React.memo(AddPotentialsButton)