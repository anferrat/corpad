import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Text } from '@ui-kitten/components'
import { basic200, primary } from '../../../styles/colors'
import { globalStyle } from '../../../styles/styles'
import { CoatingDrawing, FourWireDrawing, ShuntDrawing, TwoWireDrawing, WennerDrawing } from '../../../../assets/drawings'
import { calculatorTypeKey, translateCalculator } from '../../../localization'

const Drawing = (props) => {
    switch (props.calculatorType) {
        case 'coating':
            return <CoatingDrawing {...props} />
        case 'current4Wire':
            return <FourWireDrawing {...props} />
        case 'current2Wire':
            return <TwoWireDrawing {...props} />
        case 'shunt':
            return <ShuntDrawing {...props} />
        case 'wenner':
            return <WennerDrawing {...props} />
        default:
            return null
    }
}

const getPoints = (calculatorType) => {
    const key = calculatorTypeKey(calculatorType)
    const points = translateCalculator(`info.points.${key}`)
    return Array.isArray(points) ? points : []
}

const getHints = (calculatorType) => {
    const key = calculatorTypeKey(calculatorType)
    const hints = translateCalculator(`info.hintItems.${key}`)
    return Array.isArray(hints) ? hints : []
}

const CalculatorInfo = (props) => {
    const points = getPoints(props.calculatorType)
    const hints = getHints(props.calculatorType)
    return (
        <ScrollView contentContainerStyle={styles.mainView} style={styles.scroll}>
            {props.calculatorType !== 'refCell' ?
                <View style={globalStyle.card}>
                    <Text category='h5' appearance='hint'>{translateCalculator('info.setup')}</Text>
                    <View style={styles.drawingContainer}>
                        <Drawing style={styles.drawing} fill={primary} calculatorType={props.calculatorType} />
                    </View>
                </View> : null}
            <View style={globalStyle.card}>
                <Text category='h5' appearance='hint' style={styles.title}>{translateCalculator('info.procedure')}</Text>
                {points.map((point, i) => (
                    <Text key={`point-${i}`} category='p1' style={styles.text}>{i + 1}. {point}</Text>

                ))}
            </View>
            {
                hints.length > 0 ?
                    <View style={globalStyle.card}>
                        <Text category='h5' appearance='hint' style={styles.title}>{translateCalculator('info.hints')}</Text>
                        {hints.map((hint, i) => (
                            <Text key={`hint-${i}`} category='p1' style={styles.text}>- {hint}</Text>
                        ))}
                    </View> : null}
        </ScrollView>
    )
}

export default React.memo(CalculatorInfo, () => true)

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: basic200,
    },
    mainView: {
        backgroundColor: basic200,
        paddingBottom: 12
    },
    drawing: {
        flex: 1,
        flexDirection: 'row',
        aspectRatio: 2,
    },
    drawingContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    title: {
        paddingBottom: 12
    },
    text: {
        paddingBottom: 18
    }
})
