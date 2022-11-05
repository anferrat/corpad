import React, { useEffect } from "react"
import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native"
import { Icon } from "@ui-kitten/components"
import { sendRequest } from "../../../database/db"
import { Text } from "@ui-kitten/components"
import { basic, primary } from "../../../styles/GlobalStyle"
import { useDispatch, useSelector } from "react-redux"
import { resetExport, setExportSetting } from "../../../store/actions/exportSurvey"
import ItemProperties from "./ItemProperties"
import CardProperties from "./CardProperties"
import CircuitProperties from "./CircuitProperties"
import ExportButton from "./ExportButton"
import { errorHandler } from "../../errorHandler"
import LoadingView from "../../_Stateless/Settings/LoadingView"


const ExportSurvey = (props) => {
    const dispatch = useDispatch()
    const extraData = useSelector(state => state.exportSurvey.extraData)
    const updateSetting = React.useCallback((setting, value) => {
        dispatch(setExportSetting(setting, value))
    }, [dispatch])


    useEffect(() => {
        const test = async () => {
            const potentialTypes = await sendRequest('SELECT', 'POTENTIAL_TYPES')
            const referenceCells = await sendRequest('SELECT', 'REFERENCE_CELL_LIST')
            const pipelineList = await sendRequest('SELECT', 'PIPELINE_LIST_DATA')
            if (potentialTypes.status === 200 && referenceCells.status === 200 && pipelineList.status === 200)
                updateSetting('extraData',
                    {
                        isLoading: false,
                        pipelineList: pipelineList.result,
                        referenceCellList: referenceCells.result,
                        potentialTypes: potentialTypes.result
                    }
                )
            else
                errorHandler(622, props.goBack)
        }
        test()
        return () => dispatch(resetExport())
    }, [])
        return (
            <LoadingView loading={extraData.isLoading}>
                <ScrollView
                    contentContainerStyle={styles.container}
                    style={styles.mainView}>
                    <Text category='s2'
                        appearance='hint'
                        style={styles.hint}>
                        <Icon
                            name='alert-circle-outline'
                            fill={basic}
                            style={styles.hintIcon} />
                        Export survey data to comma separated text file. Rows will be survey items (test points, rectifiers, pipelines) and columns - readings. If you have complex test point structures, make sure to only select readings you need for better result
                    </Text>
                    <ItemProperties
                        updateSetting={updateSetting} />
                    <CardProperties
                        extraData={extraData}
                        updateSetting={updateSetting} />
                    <CircuitProperties
                        updateSetting={updateSetting} />
                </ScrollView>
                <ExportButton />
            </LoadingView>
        )
}

export default ExportSurvey

export const styles = StyleSheet.create({
    button: {
        marginTop: 12,
        position: 'absolute',
        bottom: 12,
        width: '95%',
        left: '2.5%'
    },
    container: {
        paddingBottom: 75
    },
    mainView: {
        backgroundColor: '#fff',
        padding: 12,
    },
    textIcon: {
        width: 15,
        height: 15,
        marginRight: 6
    },
    selectIcon: {
        width: 20,
        height: 20,
        marginHorizontal: 0
    },
    select: {
        paddingBottom: 12,
    },
    checkBox: {
        paddingVertical: 12
    },
    checkBoxText: {
        marginLeft: 12,
        fontSize: 12
    },
    hidden: {
        display: 'none',
    },
    hintIcon: {
        width: 13,
        height: 13,
        marginRight: 6
    },
    hint: {
        paddingBottom: 12
    },
    title: {
        paddingVertical: 12
    },
    radio: {
        paddingTop: 12,
        paddingBottom: 24
    },
    emptyView: {
        ...StyleSheet.absoluteFill,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backdrop: {
        alignItems: 'center',
        justifyContent: 'center',
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    exportStatus: {
        marginTop: 12,
        paddingBottom: 100
    }
})

//modify and can be used for rest of potential readings

