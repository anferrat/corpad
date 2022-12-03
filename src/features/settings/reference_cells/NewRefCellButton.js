import React, { useState } from "react"
import CreateButton from "./components/CreateButton"
import NewRefCellModal from "./NewRefCellModal"

const NewRefCellButton = (props) => {
    const [modalVisible, setModalVisible] = useState(false)

    const addRefCellHandler = React.useCallback((name, type) => {
        props.addRefCell(name, type)
        setModalVisible(false)
    }, [setModalVisible, props.addRefCell])

    return (
        <>
            <CreateButton title='Create new portable reference' onPress={setModalVisible.bind(this, true)} />
            <NewRefCellModal
                isVisible={modalVisible}
                dismiss={setModalVisible.bind(this, false)}
                addRefCellHandler={addRefCellHandler}
            />
        </>
    )
}

export default NewRefCellButton
