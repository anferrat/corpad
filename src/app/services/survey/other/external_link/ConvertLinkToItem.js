import { PotentialUnits } from "../../../../../constants/global"

export class ConvertLinkToItem {
    constructor(linkDecoder, generateCompositeItem, potentialPresenter, getCurrentSurveyStatusService) {
        this.linkDecoder = linkDecoder
        this.generateCompositeItem = generateCompositeItem
        this.potentialPresenter = potentialPresenter
        this.getCurrentSurveyStatusService = getCurrentSurveyStatusService
    }

    async execute(link) {
        const data = this.linkDecoder.decode(link)
        const { linkType } = data
        const [{ item, pipelines, potentialTypes, referenceCells }, { isLoaded }] = await Promise.all([
            this.generateCompositeItem.execute(data),
            this.getCurrentSurveyStatusService.execute()])
        const convertedSubitems = item.subitems.map(subitem => {
            if (subitem.potentials) {
                const { potentials } = this.potentialPresenter.executeWithList(subitem.potentials, potentialTypes, referenceCells, PotentialUnits.VOLTS)
                subitem.setPotentials(potentials)
            }
            return subitem
        })

        item.setSubitems(convertedSubitems)
        return {
            item,
            pipelines,
            potentialUnit: PotentialUnits.VOLTS,
            linkType: linkType,
            isSurveyLoaded: isLoaded
        }
    }
}