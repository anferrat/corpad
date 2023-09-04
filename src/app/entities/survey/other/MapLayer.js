export class MapLayer {
    constructor(id, uid, name, comment, timeCreated, timeModified, strokeColor, strokeWidth, fillColor, data, visible) {
        this.id = id
        this.uid = uid
        this.name = name
        this.comment = comment
        this.timeCreated = timeCreated
        this.timeModified = timeModified
        this.strokeColor = strokeColor
        this.strokeWidth = strokeWidth
        this.fillColor = fillColor
        this.data = data
        this.visible = visible
    }
}