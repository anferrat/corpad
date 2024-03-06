export class UrlListener {
    constructor(linkingService, urlResolver) {
        this.linkingService = linkingService
        this.urlResolver = urlResolver
    }

    addListener(callback, onError, onSuccess) {
        return this.linkingService.addUrlListener(async (url) => await this.urlResolver.execute(url, callback, onError, onSuccess))
    }
}