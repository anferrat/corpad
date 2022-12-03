import React, { useEffect } from "react"
import { ScrollView } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { Text, Icon } from "@ui-kitten/components"
import { sendRequest } from "../../../api/database/index"
import { basic } from "../../../styles/colors"
import { resetExport, setExportSetting } from "../../../store/actions/exportSurvey"
import ItemProperties from "./ItemProperties"
import CardProperties from "./CardProperties"
import CircuitProperties from "./CircuitProperties"
import ExportButton from "./ExportButton"
import { errorHandler } from "../../../helpers/error_handler"
import LoadingView from "../../../components/LoadingView"
import { styles } from './styles/styles'


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

