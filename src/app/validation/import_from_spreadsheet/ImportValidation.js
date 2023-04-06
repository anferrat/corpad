import { FieldConverter } from "./FieldConverter";
import { ItemSchema } from "./ItemSchema";
import { PotentialSchema } from "./PotentialSchema";
import { SubitemSchema } from "./SubitemSchema";
import { Validatior } from "./Validatior";

export class ImportValidation {
    constructor () {
        this.fieldConverter = new FieldConverter()
        this.itemValidator = new Validatior(new ItemSchema(), this.fieldConverter)
        this.subitemValidator = new Validatior(new SubitemSchema(new PotentialSchema()), this.fieldConverter)
    }

    execute(object, itemType) {
        return object.map(row => {
            let warnings = []

            if (!row.success)
                return { success: false }
            const item = this.itemValidator.execute(row.item, itemType)
            if (!item.success)
                return { success: false }
            const subitems = row.subitems
                .map(subitem => this.subitemValidator.execute(subitem, subitem.type))
                .filter(({ success, type }) => {
                    if (!success)
                        warnings.push({
                            type: type,
                            warningCode: 'subitemValidator',
                            originalValue: null,
                            convertedValue: null
                        })
                    return success
                })
            return {
                item: item.result,
                subitems: subitems.map(subitem => subitem.result),
                warnings: [...warnings, ...item.warnings, ...(subitems.map(subitem => subitem.warnings).flat())],
                success: true,
            }
        })
    }

}