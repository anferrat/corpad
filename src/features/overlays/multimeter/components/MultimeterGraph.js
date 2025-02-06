import React from 'react'
import { View, StyleSheet } from 'react-native'
import { CartesianChart, Line } from 'victory-native'
import { useMultimeterGraph } from '../hooks/useMultimeterGraph'
import { primary } from '../../../../styles/colors'
import InputField from '../../../../components/Input'


const MultimeterGraph = ({ history, xMax, yMax, onEndEditingYMax, onEndEditingXMax, xMaxValid, yMaxValid, graphYUnit }) => {
    const { data,
        xKey,
        yKeys,
        transformState,
        viewport,
        xAxis,
        yAxis,
        transformConfig,
        yValue,
        xValue,
        setYValue,
        setXValue
    } = useMultimeterGraph(history, xMax, yMax)
    return (
        <View style={styles.container}>
            <View style={styles.inputs}>
                <InputField
                    style={styles.inputLeft}
                    keyboardType='numeric'
                    label='Y-axis limit'
                    onEndEditing={onEndEditingYMax}
                    unit={graphYUnit}
                    valid={yMaxValid}
                    onChangeText={setYValue}
                    value={yValue === null ? '' : String(yValue)} />
                <InputField
                    style={styles.inputRight}
                    keyboardType='numeric'
                    label='X-axis limit'
                    onEndEditing={onEndEditingXMax}
                    onChangeText={setXValue}
                    valid={xMaxValid}
                    unit={'s'}
                    value={xValue === null ? '' : String(xValue)} />
            </View>
            <CartesianChart
                padding={10}
                data={data}
                xKey={xKey}
                yKeys={yKeys}
                viewport={viewport}
                transformState={transformState}
                xAxis={xAxis}
                yAxis={yAxis}
                transformConfig={transformConfig}>
                {({ points }) => (
                    <Line
                        points={points.y}
                        color={primary}
                        strokeWidth={2} />
                )}
            </CartesianChart>
        </View>
    )
}


export default React.memo(MultimeterGraph)

const styles = StyleSheet.create({
    container: {
        minHeight: 150,
        borderWidth: 0,
        flex: 1
    },
    inputs: {
        flexDirection: 'row',
        padding: 12,
    },
    inputLeft: {
        flex: 1,
        paddingRight: 6
    },
    inputRight: {
        flex: 1,
        paddingLeft: 6
    }
})