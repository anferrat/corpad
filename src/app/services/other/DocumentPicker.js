import RNDocumentPicker from 'react-native-document-picker'
import { Error, errors } from '../../utils/Error'
import { FileMimeTypes, SurveyLoadingStatuses } from '../../entities/survey/other/properties'

export class DocumentPicker {
    constructor() { }

    async execute(type) {
        try {
            return await RNDocumentPicker.pickSingle({ allowMultiSelection: false, type })
        }
        catch (er) {
            if (er.code !== 'DOCUMENT_PICKER_CANCELED')
                throw new Error(errors.GENERAL, 'Document picker error', er, 423)
            else throw new Error(errors.GENERAL, 'Document picker cancelled', 'Operation was cancelled by user', 101)
        }
    }

    async pickSurveyFile(onStatusChanged) {
        if (onStatusChanged)
            onStatusChanged(SurveyLoadingStatuses.SELECTING)
        const file = await this.execute(FileMimeTypes.JSON)
        if (onStatusChanged)
            onStatusChanged(SurveyLoadingStatuses.LOADING, file)
        return file
    }

    pickCommaSeparetedFile() {
        return this.execute(FileMimeTypes.TEXT)
    }
}