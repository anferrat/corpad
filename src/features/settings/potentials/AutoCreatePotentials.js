import React, { useEffect, useState, useRef } from "react"
import { sendRequest } from "../../../api/database/index"
import { errorHandler } from "../../../helpers/error_handler"
import SettingToggle from "./components/SettingToggle"

const AutoCreatePotentials = (props) => {
    const [checked, setChecked] = useState(false)
    const componentMounted = useRef(true)
    useEffect(() => { setChecked(!!props.checked) }, [props.checked])
    useEffect(() => () => componentMounted.current = false, [])

    const toggleHandler = React.useCallback(async (isChecked) => {
        setChecked(isChecked)
        const updateRequest = await sendRequest('UPDATE', 'SETTING', { setting: 'autoCreatePotentials', value: isChecked ? 1 : 0 })
        if (updateRequest.status !== 200) {
            errorHandler(623)
            if (componentMounted.current)
                setChecked(!isChecked)
        }
    }, [setChecked])

    return (
        <SettingToggle
            hidden={props.hidden}
            checked={checked}
            setChecked={toggleHandler}
            title='Auto-create potentials'
            subtitle='New readings will have ON/OFF potential fields added upon creation' />
    )
}

export default React.memo(AutoCreatePotentials)