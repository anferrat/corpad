import React, { useState, useEffect, useRef } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import { Text, Divider } from "@ui-kitten/components"
import { sendRequest } from "../../../database/db"
import { primary, basic200 } from "../../../styles/GlobalStyle"
import NumberDisplay from "../../_Stateless/Info/NumberDisplay"
import InfoListItem from "../../_Stateless/Info/InfoListItem"
import ProgressDisplay from "./ProgressDisplay"
import SurveyName from "./SurveyName"
import { calculateRegionCorners } from "../../customFunctions"
import { ScrollView } from "react-native-gesture-handler"
import { referenceCellCodes } from "../../../constants/constants"
import { coordTransform, getDistance } from "../../View/NavigationWidget" //maybe move it to separate file for distance calculations
import { errorHandler } from "../../errorHandler"

const getMainRefCellType = (refCellList) => {
    const mainRc = refCellList.filter(rc => rc.mainReference)
    if (mainRc.length === 0)
        return null
    else
        return referenceCellCodes[mainRc[0]?.rcType] ?? null
}

const calculateRadius = (markers) => {
    if (markers.length <= 1)
        return 'N/A'
    else {
        const region = calculateRegionCorners(markers)
        return getDistance((coordTransform(region.maxLat, region.maxLon, region.minLat, region.minLon)).distance / 2)
    }

}


const SurveyInfo = () => {
    const componentMounted = useRef(true)
    const [surveyData, setSurveydata] = useState({
        loaded: false,
        surveyName: 'Error',
        progress: [{ pass: 0, attention: 0, issue: 0, unknown: 0, total: 0 }, { pass: 0, attention: 0, issue: 0, unknown: 0, total: 0 }],
        tpCount: 0,
        pipelineCount: 0,
        rectifierCount: 0,
        moreInfo: [],
    })

    useEffect(() => {
        const fetchData = async () => {
            const settings = (await sendRequest('SELECT', 'SETTINGS', {}))
            const tpInfo = (await sendRequest('SELECT', 'SURVEY_INFO_TEST_POINTS', {}))
            const rectifierInfo = (await sendRequest('SELECT', 'SURVEY_INFO_RECTIFIERS', {}))
            const pipelineList = await sendRequest('SELECT', 'PIPELINE_LIST', {})
            const refCellList = await sendRequest('SELECT', 'REFERENCE_CELL_LIST', {})
            const markers = await sendRequest('SELECT', 'MARKERS', {})
            const lastModified = await sendRequest('SELECT', 'SURVEY_INFO_LAST_MODIFIED', {})
            const potentials = await sendRequest('SELECT', 'SURVEY_INFO_POTENTIALS', {})
            if (potentials.status === 200 && settings.status === 200 && tpInfo.status === 200 && rectifierInfo.status === 200 && pipelineList.status === 200 && refCellList.status === 200 && markers.status === 200 && lastModified.status === 200) {
                if (componentMounted.current)
                    setSurveydata({
                        loaded: true,
                        surveyName: settings.result.surveyName,
                        progress: [
                            {
                                pass: tpInfo.result.good,
                                attention: tpInfo.result.warning,
                                issue: tpInfo.result.danger,
                                unknown: tpInfo.result.unknown,
                                total: tpInfo.result.count
                            },
                            {
                                pass: rectifierInfo.result.good,
                                attention: rectifierInfo.result.warning,
                                issue: rectifierInfo.result.danger,
                                unknown: rectifierInfo.result.unknown,
                                total: rectifierInfo.result.count
                            }],
                        tpCount: tpInfo.result.count,
                        pipelineCount: pipelineList.result.length,
                        rectifierCount: rectifierInfo.result.count,
                        moreInfo: [
                            { title: 'Main reference', subtitle: 'Portable', icon: 'RE', pack: 'cp', value: getMainRefCellType(refCellList.result) },
                            { title: 'Last updated', subtitle: 'Test point', icon: 'TS', pack: 'cp', value: lastModified.result.count ? lastModified.result.name : 'N/A' },
                            { title: 'Survey area', subtitle: 'Radius', icon: 'map-outline', pack: null, value: calculateRadius(markers.result) },
                            { title: 'Potentials', subtitle: 'Total number of readings', icon: 'grid', pack: null, value: potentials.result }
                        ]
                    })

            }
            else errorHandler(626)
        }
        componentMounted.current = true
        fetchData()
        return () => componentMounted.current = false
    }, [setSurveydata, componentMounted])

    if (surveyData.loaded)
        return (
            <ScrollView contentContainerStyle={styles.mainView}>
                <SurveyName surveyName={surveyData.surveyName} />
                <ProgressDisplay
                    data={surveyData.progress} />
                <View style={styles.dataLine}>
                    <NumberDisplay number={surveyData.tpCount} title='Test points' icon='TS-filled' />
                    <NumberDisplay number={surveyData.rectifierCount} title='Rectifiers' icon='RT-filled' />
                    <NumberDisplay number={surveyData.pipelineCount} title='Pipelines' icon='PL-filled' />
                </View>
                <View style={styles.moreInfo}>
                    {surveyData.moreInfo.map((item, index) => <React.Fragment key={item.title + item.index}>
                        <InfoListItem
                            title={item.title}
                            subtitle={item.subtitle}
                            icon={item.icon}
                            pack={item.pack}
                            value={item.value} />
                        {index !== surveyData.moreInfo.length - 1 ? <Divider style={styles.divider} /> : null}
                    </React.Fragment>)}
                </View>
            </ScrollView>
        )
    else return <View style={styles.emptyView}><ActivityIndicator color={primary} size='large' /></View>
}

export default SurveyInfo

const styles = StyleSheet.create({
    dataLine: {
        flexBasis: 80,
        backgroundColor: primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingVertical: 6,
        borderRadius: 12,
        elevation: 5
    },
    mainView: {
        backgroundColor: basic200,
        padding: 12
    },
    emptyView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 24,
    },
    testPointInfo: {
        marginBottom: 12,
        padding: 12,
        alignItems: 'center'
    },
    divider: {
        marginHorizontal: 12
    },
    testPointTypes: {
        flex: 1,
        flexDirection: 'row'
    },
    moreInfo: {
        flex: 1,
        marginTop: 24,
        elevation: 5,
        backgroundColor: '#fff',
        borderRadius: 12,
    }
})