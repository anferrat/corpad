import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import { Button, ListItem, Icon, Text } from '@ui-kitten/components'
import { useDispatch, useSelector } from 'react-redux'
import DocumentPicker from 'react-native-document-picker'
import RNFS from 'react-native-fs'
import { parseCSV } from '../../files/helpers/genCsv'
import { errorHandler } from '../errorHandler'
import { setImportData } from '../../store/actions/importData'
import { file, plusCircle } from '../_Stateless/Icons'
import { basic400, danger, primary } from '../../styles/GlobalStyle'

const SelectFile = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const fileName = useSelector(state => state.importData.fileName)
    const rows = useSelector(state => state.importData.data?.length ?? null)
    const columns = useSelector(state => state.importData.fields.length)

    const resetFile = () => {
        dispatch(setImportData([], [], null))
    }

    useEffect(() => () => resetFile(), [])

    const ResetIcon = (props) => <Pressable onPress={resetFile}><Icon {...props} fill={danger} name='close' /></Pressable>

    const selectFile = async () => {
        setLoading(true)
        try {
            const externalFile = await DocumentPicker.pickSingle({ allowMultiSelection: false, type: 'text/*' })
            const fileData = await RNFS.readFile(externalFile.uri)
            const data = parseCSV(fileData)
            if (data.data.length === 0)
                errorHandler(415)
            else if (data.meta.fields.length === 0)
                errorHandler(416)
            else
                dispatch(setImportData(data.meta.fields, data.data, externalFile.name))
        }
        catch (er) {
            if (er.code !== 'DOCUMENT_PICKER_CANCELED')
                errorHandler(417)
        }
        setLoading(false)
    }
    return (
        <>
            <Text category='h6' style={styles.title}>2. Select file</Text>
            <View style={styles.mainView}>
                <Icon style={styles.icon} fill={primary} name='download-outline' />
                <Text appearance={'hint'} style={styles.text} category='s1'>Only comma-separated text files (.csv) are supported. First row should be headers. Check corpad.ca to learn more.</Text>
                {fileName === null ? (
                    <Button style={styles.button} onPress={selectFile} accessoryLeft={loading ? <ActivityIndicator color={'#fff'} /> : plusCircle} disabled={loading} >Select file</Button>
                )
                    :
                    <ListItem title={fileName} description={`Rows: ${rows}, Columns: ${columns}`} accessoryLeft={file} accessoryRight={ResetIcon} />
                }
            </View>
        </>
    )
}

export default React.memo(SelectFile)

const styles = StyleSheet.create({
    mainView: {
        margin: 12,
        marginTop: 0,
        paddingVertical: 24,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: basic400,
        borderStyle: 'dashed'
    },
    button: {
        margin: 12,
    },
    itemSelection: {
        paddingHorizontal: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    title: {
        margin: 12,
    },
    text: {
        margin: 12,
        textAlign: 'center'
    },
    icon: {
        width: 50,
        height: 50,
    }
})