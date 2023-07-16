export class Validatior {
    constructor (schemaSelector, fieldConverter) {
        this.schemaSelector = schemaSelector
        this.fieldConverter = fieldConverter
    }

    _pathParser(path, obj) {
        //Parser only works for objects with nested objects and arrays. will not work for top level arrays
        const pathArray = path.split('.')
        return pathArray.reduce((acc, cur, i) => {
            if (cur.includes('[')) {
                const [prop, indexStr] = cur.split('[')
                const index = parseInt(indexStr.slice(0, -1), 10)
                return acc[prop][index]
            }
            return acc[cur]
        }, obj)
    }

    _pathAssigner(path, obj, value) {
        const pathArray = path.split('.')
        const lastProp = pathArray.pop()
        const targetObj = pathArray.reduce((acc, cur, i) => {
            if (cur.includes('[')) {
                const [prop, indexStr] = cur.split('[')
                const index = parseInt(indexStr.slice(0, -1), 10)
                return acc[prop][index]
            }
            return acc[cur]
        }, obj)
        targetObj[lastProp] = value
    }

    execute(obj, type) {
        let warnings = []
        let item = obj
        try {
            return {
                result: this.schemaSelector.execute(type).validateSync(item, { abortEarly: false }),
                warnings: warnings,
                success: true
            }
        }
        catch (err) {
            if (err.inner) {
                warnings = err.inner.map(({ path, message, value }) => {
                    const currentValue = this._pathParser(path, item)
                    if (message === 'nameFormat') {
                        this._pathAssigner(path, item, this.fieldConverter.convertName(currentValue))
                    } else if (message === 'statusMismatch') {
                        this._pathAssigner(path, item, this.fieldConverter.defaultStatus())
                    } else if (message === 'stringLengthMax40') {
                        this._pathAssigner(path, item, this.fieldConverter.truncate(currentValue, 40))
                    } else if (message === 'stringLengthMax80') {
                        this._pathAssigner(path, item, this.fieldConverter.truncate(currentValue, 80))
                    } else if (message === 'stringLengthMax300') {
                        this._pathAssigner(path, item, this.fieldConverter.truncate(currentValue, 300))
                    } else if (message === 'testPointTypeMismatch') {
                        this._pathAssigner(path, item, this.fieldConverter.defaultTestPointType())
                    } else this._pathAssigner(path, item, null)
                    return {
                        type: type,
                        property: path,
                        originalValue: value,
                        convertedValue: this._pathParser(path, item),
                        warningCode: message
                    }
                })
            }
        }
        try {
            return {
                result: this.schemaSelector.execute(type).validateSync(item),
                warnings: warnings,
                success: true
            }
        }
        catch (err) {
            return {
                result: null,
                type: type,
                success: false
            }
        }
    }
}