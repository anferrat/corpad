import React, { createContext } from 'react'
import useMultimeterSettings from '../hooks/useMultimeterSettings'

export const MultimeterSettingContext = createContext({
    isLoading: true
})

export const MultimeterSettingProvider = ({ children }) => {
    const multimeterSettings = useMultimeterSettings()
    return (
        <MultimeterSettingContext.Provider value={multimeterSettings}>
            {children}
        </MultimeterSettingContext.Provider>
    )
}