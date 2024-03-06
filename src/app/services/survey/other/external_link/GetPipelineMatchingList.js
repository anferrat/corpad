export class GetPipelineMatchingList {
    constructor(pipelineRepo, listPresenter, linkDecoder, generateCompositeItem, createPipelineMapService) {
        this.pipelineRepo = pipelineRepo
        this.listPresenter = listPresenter
        this.linkDecoder = linkDecoder
        this.generateCompositeItem = generateCompositeItem
        this.createPipelineMapService = createPipelineMapService
    }


    async execute(link) {
        const data = this.linkDecoder.decode(link)
        const [target, { pipelines }] = await Promise.all(
            [
                this.pipelineRepo.getAll(),
                this.generateCompositeItem.execute(data)])
        const { pipelineMap } = this.createPipelineMapService.execute(pipelines, target, undefined)
        return {
            source: this.listPresenter.execute(pipelines),
            target: this.listPresenter.execute(target),
            pipelineMap: pipelineMap
        }
    }

}