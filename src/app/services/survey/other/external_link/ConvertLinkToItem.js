export class ConvertLinkToItem {
    constructor(linkDecoder, generateCompositeItem) {
        this.linkDecoder = linkDecoder
        this.generateCompositeItem = generateCompositeItem
    }

    async execute(link) {
        const data = this.linkDecoder.decode(link)
        return await this.generateCompositeItem.execute(data)
    }
}