export class RemoveNfcWritingListener {
    constructor(ndefRepo) {
        this.ndefRepo = ndefRepo
    }

    async remove() {
        await this.ndefRepo.stop()
    }
}