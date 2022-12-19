import DocumentPicker from 'react-native-document-picker'

export const pickFile = async (type) => {
    try {
        return ({
            status: 200,
            result: await DocumentPicker.pickSingle({ allowMultiSelection: false, type: type === 'json' ? 'application/json' : 'text/*' })
        })
    }
    catch (er) {
        if (er.code !== 'DOCUMENT_PICKER_CANCELED')
            return {
                status: 423
            }
        else return ({
            status: 201
        })
    }
}