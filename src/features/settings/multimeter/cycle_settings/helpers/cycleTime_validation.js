

const isTimeValid = (value) => {
    return Number.isInteger(value) && value >= 200 && value <= 20000
}

const isDelayValid = (value, cycleDuration) => {
    return isTimeValid(cycleDuration) && Number.isInteger(Number(value)) && value <= cycleDuration / 2 && value >= 20
}

const convertTimeValue = (value) => Math.floor(value - value % 100)


const convertDelayValue = (value) => Math.floor(value)

export const validateSettings = (onTime, offTime, onSetup, offDelay, isTimeSync, onOffCaptureActive) => {
    let onTimeValue = onTime
    let offTimeValue = offTime
    let onSetupValue = onSetup
    let offDelayValue = offDelay
    let errorCodes = []
    let valid = {
        onTime: true,
        offTime: true,
        onSetup: true,
        offDelay: true
    }
    if (onOffCaptureActive) {
        onTimeValue = convertTimeValue(onTimeValue)
        offTimeValue = convertTimeValue(offTimeValue)
        valid.onTime = isTimeValid(onTimeValue)
        valid.offTime = isTimeValid(offTimeValue)
        !valid.onTime || !valid.offTime ? errorCodes.push('timeError') : null
        if (isTimeSync) {
            onSetupValue = convertDelayValue(onSetupValue)
            offDelayValue = convertDelayValue(offDelayValue)
            valid.onSetup = isDelayValid(onSetupValue, onTimeValue)
            valid.offDelay = isDelayValid(offDelayValue, offTimeValue)
            !valid.onSetup || !valid.offDelay ? errorCodes.push('delayError') : null
        }
    }

    return {
        onTime: onTimeValue,
        offTime: offTimeValue,
        onSetup: onSetupValue,
        offDelay: offDelayValue,
        valid: valid,
        errorCodes: errorCodes
    }
}