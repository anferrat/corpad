import React from "react"
import { importIcon } from "../../components/Icons"
import ImportModal from "./components/ImportModal"
import MainActionButton from "../../components/ActionButton"

const ImportButton = (props) => {
    return (
        <>
            <MainActionButton
                title='Import'
                icon={importIcon}
                valid={true}
                onPress={() => { }} />
        </>
    )
}

export default ImportButton