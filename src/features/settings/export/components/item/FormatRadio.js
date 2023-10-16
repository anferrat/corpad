import Radio from '../Radio'
import React from 'react'
import { ExportFormatTypeLabeles } from '../../../../../constants/labels'


const FormatRadio = ({ checked, onChange, format }) => {
    const onChangeHandler = React.useCallback(() => onChange(format), [onChange, format])
    return (
        <Radio
            onChange={onChangeHandler}
            checked={checked}>
            {ExportFormatTypeLabeles[format] ?? 'huuu'}
        </Radio>
    )
}

export default React.memo(FormatRadio)
