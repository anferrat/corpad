import React, { useState, useEffect, useRef } from "react"
import { StyleSheet, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Divider } from "@ui-kitten/components"
import { sendCombinedRequest, sendRequest } from "../../../api/database/index"
import { basic300 } from "../../../styles/colors"
import { globalStyle } from "../../../styles/styles"
import NumberDisplay from "./components/NumberDisplay"
import InfoListItem from "./components/InfoListItem"
import ProgressDisplay from "./ProgressDisplay"
import SurveyName from "./SurveyName"
import { calculateRegionCorners } from "../../../helpers/functions"
import { referenceCellCodes } from "../../../constants/constants"
import { coordTransform, getDistance } from "../../../helpers/functions"
import { errorHandler } from "../../../helpers/error_handler"
import LoadingView from "../../../components/LoadingView"

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


const SurveyInfo = ({goBack}) => {
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
            const data = await sendCombinedRequest([
                ['SELECT', 'SETTINGS', {}],
                ['SELECT', 'SURVEY_INFO_TEST_POINTS', {}],
                ['SELECT', 'SURVEY_INFO_RECTIFIERS', {}],
                ['SELECT', 'PIPELINE_LIST', {}],
                ['SELECT', 'REFERENCE_CELL_LIST', {}],
                ['SELECT', 'MARKERS', {}],
                ['SELECT', 'SURVEY_INFO_LAST_MODIFIED', {}],
                ['SELECT', 'SURVEY_INFO_POTENTIALS', {}]
            ])
            if (data.status === 200) {
                if (componentMounted.current)
                    setSurveydata({
                        loaded: true,
                        surveyName: data.result[0].surveyName,
                        progress: [
                            {
                                pass: data.result[1].good,
                                attention: data.result[1].warning,
                                issue: data.result[1].danger,
                                unknown: data.result[1].unknown,
                                total: data.result[1].count
                            },
                            {
                                pass: data.result[2].good,
                                attention: data.result[2].warning,
                                issue: data.result[2].danger,
                                unknown: data.result[2].unknown,
                                total: data.result[2].count
                            }],
                        tpCount: data.result[1].count,
                        pipelineCount: data.result[3].length,
                        rectifierCount: data.result[2].count,
                        moreInfo: [
                            { title: 'Main reference', subtitle: 'Portable', icon: 'RE', pack: 'cp', value: getMainRefCellType(data.result[4]) },
                            { title: 'Last updated', subtitle: 'Test point', icon: 'TS', pack: 'cp', value: data.result[6].count ? data.result[6].name : 'N/A' },
                            { title: 'Survey area', subtitle: 'Radius', icon: 'map-outline', pack: null, value: calculateRadius(data.result[5]) },
                            { title: 'Potentials', subtitle: 'Total number of readings', icon: 'grid', pack: null, value: data.result[7] }
                        ]
                    })

            }
            else errorHandler(626, goBack)
        }
        componentMounted.current = true
        fetchData()
        return () => componentMounted.current = false
    }, [setSurveydata, componentMounted])

    return (
        <LoadingView loading={!surveyData.loaded}>
            <ScrollView>
                <View style={globalStyle.card}>
                    <SurveyName surveyName={surveyData.surveyName} />
                    <ProgressDisplay
                        data={surveyData.progress} />
                    <View style={styles.dataLine}>
                        <NumberDisplay number={surveyData.tpCount} title='Test points' icon='TS-filled' />
                        <NumberDisplay number={surveyData.rectifierCount} title='Rectifiers' icon='RT-filled' />
                        <NumberDisplay number={surveyData.pipelineCount} title='Pipelines' icon='PL-filled' />
                    </View>
                </View>
                <View style={{ ...globalStyle.card, ...styles.moreInfo }} >
                    {
                        surveyData.moreInfo.map((item, index) => <React.Fragment key={item.title + item.index}>
                            <InfoListItem
                                title={item.title}
                                subtitle={item.subtitle}
                                icon={item.icon}
                                pack={item.pack}
                                value={item.value} />
                            {index !== surveyData.moreInfo.length - 1 ? <Divider style={styles.divider} /> : null}
                        </React.Fragment>)
                    }
                </View>
            </ScrollView>
        </LoadingView >
    )

}

export default SurveyInfo

const styles = StyleSheet.create({
    dataLine: {
        flexBasis: 80,
        marginHorizontal: -12,
        marginBottom: -12,
        marginTop: 12,
        backgroundColor: basic300,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingVertical: 6,
        borderRadius: 0,

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
        marginBottom: 12,
        borderRadius: 12,
        padding: 0
    }
})