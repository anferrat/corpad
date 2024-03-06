import React from 'react'
import { PotentialUnitLabels, ReferenceCellCodeLabels } from '../../../constants/labels'
import TextLine from '../../TextLine'

const PotentialTextLine = ({ name, value, referenceCellType, potentialUnit }) => {
    const referenceCellCode = ReferenceCellCodeLabels[referenceCellType] ?? ""
    const unit = React.useMemo(() => ({
        main: PotentialUnitLabels[potentialUnit] ?? "",
        script: referenceCellCode,
        format: 'sub'
    }), [potentialUnit, referenceCellCode])
    return <TextLine
        title={name}
        value={value}
        unit={unit}
    />
}

export default React.memo(PotentialTextLine)