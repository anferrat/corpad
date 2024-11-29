import { Error, errors } from "../../../../../../utils/Error"
import toKml from 'anferrat-tokml'


export class _ParseGeoJsonToKml {
    constructor() {
        this.toKmlConverter = toKml
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