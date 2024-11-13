import { Error, errors } from "../../../../../../utils/Error"


export class _ParseGeoJsonToKml {
    constructor() {
        this.toKmlConverter = require('tokml')
    }

    execute(geoJson, nameProperty) {
        try {
            return this.toKmlConverter(geoJson, {
                name: nameProperty,
                simplestyle: true
            })
        }
        catch (er) {
            throw new Error(errors.GENERAL, 'Unable to convert file to KML', er)
        }
    }


}