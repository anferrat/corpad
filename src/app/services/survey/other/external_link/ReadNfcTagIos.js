import { Error, errors } from "../../../../utils/Error"

export class ReadNfcTagIos {
    constructor(ndefRepo) {
        this.ndefRepo = ndefRepo
    }

    async execute() {
        try {
            await this.ndefRepo.start('Approach an NFC label')
            const message = await this.ndefRepo.readTag()
            const uri = this.ndefRepo.decodeUri(message)
            await this.ndefRepo.stop()
            if (uri.startsWith('com.corpad://l/'))
                return uri
            else
                throw new Error(errors.NFC, 'Unable to read link', 'URI is not supported', 843)
        }
        catch (er) {
            await this.ndefRepo.stop()
            throw er
        }
    }
}