import React from "react"
import { StyleSheet, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { basic300 } from "../../../styles/colors"
import { globalStyle } from "../../../styles/styles"
import NumberDisplay from "./components/NumberDisplay"
import ProgressDisplay from "./components/ProgressDisplay"
import SurveyNameView from "./components/SurveyNameView"
import LoadingView from "../../../components/LoadingView"
import useSurveyInfo from "./hooks/useSurveyInfo"
import { items, labels } from "../../../constants/constants"
import MoreInfoView from "./components/MoreInfoView"

const itemIcons = ['TS-filled', 'RT-filled', 'PL-filled']

export const SurveyOverview = () => {
    const { count, status, extraInfo, name, loading, inputText, updateSurveyName, onChangeNameInput, resetNameInput } = useSurveyInfo()

    return (
        <LoadingView loading={loading}>
            <ScrollView
                contentContainerStyle={styles.container}>
                <View style={globalStyle.card}>
                    <SurveyNameView
                        name={name}
                        inputText={inputText}
                        updateSurveyName={updateSurveyName}
                        onChangeNameInput={onChangeNameInput}
                        resetNameInput={resetNameInput} />
                    <ProgressDisplay
                        status={status}
                        count={count} />
                    <View
                        style={styles.dataLine}>
                        {items.map((item, index) => (
                            <NumberDisplay
                                key={item}
                                number={count[item]}
                                title={`${labels[item].label}s`}
                                icon={itemIcons[index]} />
                        ))}
                    </View>
                    <View
                        style={styles.moreInfo}>
                        <MoreInfoView
                            extraInfo={extraInfo} />
                    </View>
                </View>
            </ScrollView>
        </LoadingView >
    )

}

export default SurveyOverview

const styles = StyleSheet.create({
    dataLine: {
        flexBasis: 100,
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
        paddingTop: 24,
        marginHorizontal: -12
    },
    container: {
        flex: 1
    }
})