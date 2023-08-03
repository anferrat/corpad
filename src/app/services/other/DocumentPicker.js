import RNDocumentPicker from 'react-native-document-picker'
import { Error, errors } from '../../utils/Error'
import { FileMimeTypes, FileTypeIdentifiers, SurveyLoadingStatuses } from '../../../constants/global'
import { Platform } from 'react-native'

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

    async pickSurveyFile() {
        return await this.execute(Platform.select({
            android: FileMimeTypes.JSON,
            ios: FileTypeIdentifiers.JSON,
            default: FileMimeTypes.JSON
        }))
    }

    pickCommaSeparetedFile() {
        return this.execute(Platform.select({
            android: FileMimeTypes.TEXT,
            ios: FileTypeIdentifiers.CSV,
            default: FileMimeTypes.CSV
        }))
    }
}