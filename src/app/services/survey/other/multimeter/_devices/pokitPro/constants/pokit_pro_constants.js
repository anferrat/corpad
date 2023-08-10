export class PokitProCurrentRanges {
    constructor() {
        this._500uA = 0
        this._2mA = 1
        this._10mA = 2
        this._125mA = 3
        this._300mA = 4
        this._3A = 5
        this._10A = 6
        this.auto = 255
    }

}

export class PokitProVoltageRanges {
    constructor() {
        this._250mV = 0
        this._2V = 1
        this._10V = 2
        this._30V = 3
        this._60V = 4
        this._125V = 5
        this._400V = 6
        this._600V = 7
        this.auto = 255
    }
}

export class PokitProMeasurementSettings {
    constructor() {
        this.IDLE = 0
        this.DC_VOLTAGE = 1
        this.AC_VOLTAGE = 2
        this.DC_CURRENT = 3
        this.AC_CURRENT = 4
    }
}


export class PokitProMaxRangeValues {
    constructor() {
        this.VOLTAGE = 600
        this.SMALL_CURRENT = 0.5
        this.LARGE_CURRENT = 10
    }
}

export class PokitProMeasurementModes {
    constructor() {
        this.VOLTAGE = 0
        this.SMALL_CURRENT = 1
        this.LARGE_CURRENT = 2
    }
}