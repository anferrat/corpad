import DocumentPicker from 'react-native-document-picker'

export const pickFile = async (type) => {
    try {
        return ({
            status: 200,
            result: await DocumentPicker.pickSingle({ allowMultiSelection: false, type: type === 'json' ? 'application/json' : 'text/csv' })
        })
    }
    catch (er) {
        return {
            status: 423
        }
    }
}