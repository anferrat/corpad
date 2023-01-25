import { ReferenceCellRepository } from "../../../../repository/sqlite/ReferenceCellRepository"
import { Error } from "../../../../utils/Error"
import { EventRegister } from 'react-native-event-listeners'

export class UpdateMainReference {
    constructor() {
        this.refCellRepo = new ReferenceCellRepository()
    }
    async execute(id) {
        const [newMainReference, currentMainReference] = await Promise.all([this.refCellRepo.getReferenceCellById(id), this.refCellRepo.getMainReference()])
        if (newMainReference.id !== currentMainReference.id) {
            newMainReference.makeMainReference()
            const update = await this.refCellRepo.updateMainReference(id)
            EventRegister.emit('mainReferenceCellChanged', newMainReference)
            return update
        }
        else return
    }
}