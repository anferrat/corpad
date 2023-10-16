import RNDocumentPicker from 'react-native-document-picker'
import { Error, errors } from '../../utils/Error'
import { FileMimeTypes, FileTypeIdentifiers, SurveyLoadingStatuses } from '../../../constants/global'
import { Platform } from 'react-native'
import { ExternalFile } from '../../entities/survey/other/ExternalFile'

export class DocumentPicker {
    constructor() { }

    _decode(uri) {
        return Platform.select({
            android: decodeURIComponent(uri),
            ios: uri,
            default: uri
        })
    }

    async execute(type) {
        try {
            const { fileCopyUri, uri, name } = await RNDocumentPicker.pickSingle({ allowMultiSelection: false, type, copyTo: 'cachesDirectory' })
            return new ExternalFile(fileCopyUri ? this._decode(fileCopyUri) : this._decode(uri), name)
        }
        catch (er) {
            if (er.code !== 'DOCUMENT_PICKER_CANCELED')
                throw new Error(errors.GENERAL, 'Document picker error', er, 423)
            else throw new Error(errors.GENERAL, 'Document picker cancelled', 'Operation was cancelled by user', 101)
        }
    }

    async pickSurveyFile() {
        return await this.execute(Platform.select({
            android: `*/*`,
            ios: FileTypeIdentifiers.ITEM,
            default: `*/*`
        }))
    }

    pickCommaSeparetedFile() {
        return this.execute(Platform.select({
            android: FileMimeTypes.TEXT,
            ios: FileTypeIdentifiers.CSV,
            default: FileMimeTypes.CSV
        }))
    }

    pickImage() {
        return this.execute(RNDocumentPicker.types.images)
    }

    pickGeoFile() {
        return this.execute(Platform.select({
            android: [FileMimeTypes.KML, FileMimeTypes.BINARY],
            ios: [FileTypeIdentifiers.KML, FileTypeIdentifiers.GPX],
            default: FileMimeTypes.KML
        }))
    }
}