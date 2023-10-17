export class MapLayerPresenter {
    constructor() {
    }


    execute(id, uid, name, comment, timeCreated, timeModified, strokeColor, strokeWidth, fillColor, visible, geoJson, points) {
        return {
            id,
            uid,
            name,
            comment,
            timeCreated,
            timeModified,
            strokeColor,
            strokeWidth,
            fillColor,
            visible,
            data: geoJson,
            points,
            featureCount: geoJson.features.length + points.length
        }
    }
}