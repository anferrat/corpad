import { errorCodes, isErrorWithCode, keepLocalCopy, pick, types } from '@react-native-documents/picker'
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
            macos: decodeURIComponent(uri),
            default: uri
        })
    }

    async execute(type) {
        try {
            const [picked] = await pick({ allowMultiSelection: false, type, mode: 'import' })
            const localCopy = await keepLocalCopy({
                files: [{ uri: picked.uri, fileName: picked.name || 'picked-file' }],
                destination: 'cachesDirectory',
            })
            const path = localCopy[0].status === 'success'
                ? this._decode(localCopy[0].localUri)
                : this._decode(picked.uri)
            const { name, size } = picked
            const file = new ExternalFile(path, name, null, size)
            const fileType = file.getFileType()
            file.setFileType(fileType)
            return file
        }
        catch (er) {
            if (!isErrorWithCode(er) || er.code !== errorCodes.OPERATION_CANCELED)
                throw new Error(errors.GENERAL, 'Document picker error', er, 423)
            else throw new Error(errors.GENERAL, 'Document picker cancelled', 'Operation was cancelled by user', 101)
        }
    }

    async pickSurveyFile() {
        return await this.execute(Platform.select({
            android: [FileMimeTypes.JSON, FileMimeTypes.ZIP, FileMimeTypes.BINARY],
            ios: [FileTypeIdentifiers.SURVEY_FILE_WITH_ASSETS, FileTypeIdentifiers.JSON],
            macos: [FileTypeIdentifiers.SURVEY_FILE_WITH_ASSETS, FileTypeIdentifiers.JSON],
            default: `*/*`
        }))
    }

    pickSpreadsheetFile() {
        return this.execute(Platform.select({
            android: [FileMimeTypes.TEXT, FileMimeTypes.XLSX],
            ios: [FileTypeIdentifiers.CSV, FileTypeIdentifiers.SPREADSHEET],
            macos: [FileTypeIdentifiers.CSV, FileTypeIdentifiers.SPREADSHEET],
            default: [FileMimeTypes.TEXT, FileMimeTypes.XLSX]
        }))
    }

    pickImage() {
        return this.execute(types.images)
    }

    pickGeoFile() {
        return this.execute(Platform.select({
            android: [FileMimeTypes.KML, FileMimeTypes.BINARY, FileMimeTypes.KMZ, FileMimeTypes.GEOJSON],
            ios: [FileTypeIdentifiers.KML, FileTypeIdentifiers.GPX, FileTypeIdentifiers.KMZ, FileTypeIdentifiers.GEOJSON],
            macos: [FileTypeIdentifiers.KML, FileTypeIdentifiers.GPX, FileTypeIdentifiers.KMZ, FileTypeIdentifiers.GEOJSON],
            default: [FileMimeTypes.KML, FileMimeTypes.KMZ, FileMimeTypes.GEOJSON]
        }))
    }
}
