import React from 'react'
import ModeToken from './ModeToken'
import Wrapper from './Wrapper'
import { translateMultimeterOverlay } from '../../../../localization'


const ModeView = ({ modes, onSelect, updatingMode, selectedMode, updating }) => {

    return (
        <Wrapper
            title={translateMultimeterOverlay('measurementModes')}>
            {modes.map(mode =>
                <ModeToken
                    key={mode}
                    mode={mode}
                    onSelect={onSelect}
                    selected={(selectedMode === mode && updatingMode === null) || updatingMode === mode}
                    inProgress={updatingMode === mode}
                    disabled={updating} />)}
        </Wrapper>
    )
}


export default React.memo(ModeView)
