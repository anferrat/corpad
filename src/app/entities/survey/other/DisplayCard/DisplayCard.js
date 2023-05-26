export class DisplayCard {
    /*
        Display card generation is taking place in repository layer for optimization. Lists must be working smoothly and with minimal number of requests.
    */
    constructor(id, uid, timeModified, status, name, itemType, dataList, readingList, testPointType) {
        this.id = id
        this.uid = uid
        this.timeModified = timeModified
        this.status = status
        this.name = name
        this.itemType = itemType
        this.dataList = dataList
        this.readingList = readingList
        this.testPointType = testPointType
    }
}