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
            ios: decodeURIComponent(uri),
            default: uri
        })
    }

    async execute(type) {
        try {
            const { fileCopyUri, uri, name } = await RNDocumentPicker.pickSingle({ allowMultiSelection: false, type, copyTo: 'cachesDirectory' })
            const path = fileCopyUri ? this._decode(fileCopyUri) : this._decode(uri)
            const file = new ExternalFile(path, name)
            const fileType = file.getFileType()
            file.setFileType(fileType)
            return file
        }
        catch (er) {
            if (er.code !== 'DOCUMENT_PICKER_CANCELED')
                throw new Error(errors.GENERAL, 'Document picker error', er, 423)
            else throw new Error(errors.GENERAL, 'Document picker cancelled', 'Operation was cancelled by user', 101)
        }
    }

    async pickSurveyFile() {
        return await this.execute(Platform.select({
            android: [FileMimeTypes.JSON, FileMimeTypes.ZIP, FileMimeTypes.BINARY],
            ios: [FileTypeIdentifiers.SURVEY_FILE_WITH_ASSETS, FileTypeIdentifiers.JSON],
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
            android: [FileMimeTypes.KML, FileMimeTypes.BINARY, FileMimeTypes.KMZ, FileMimeTypes.GEOJSON],
            ios: [FileTypeIdentifiers.KML, FileTypeIdentifiers.GPX, FileTypeIdentifiers.KMZ, FileTypeIdentifiers.GEOJSON],
            default: [FileMimeTypes.KML, FileMimeTypes.KMZ, FileMimeTypes.GEOJSON]
        }))
    }
}