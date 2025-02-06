import { useChartTransformState } from "victory-native"
import montserrat from '../../../../../assets/fonts/Montserrat.ttf'
import { useEffect, useMemo, useState } from "react"
import { useFont } from "@shopify/react-native-skia"

export const useMultimeterGraph = (history, xMax, yMax) => {
    const [yValue, setYValue] = useState(yMax)
    const [xValue, setXValue] = useState(xMax / 1000)
    const font = useFont(montserrat, 12)
    const Y_MIN = Math.abs(yMax) < 0.5 ? 0 : (yMax < 0 ? 0.5 : -0.5)
    const X_MIN = 0
    const { state } = useChartTransformState({})
    const viewport = useMemo(() => ({
        y: [Y_MIN, yMax],
        x: [xMax, X_MIN]
    }), [yMax, xMax])
    //console.log(new Date(viewport.x[0]).getSeconds(), new Date(viewport.x[1]).getSeconds())

    const xAxis = useMemo(() => ({
        font,
        tickCount: 10,
        formatXLabel: (x) => String(x / 1000)
    }), [font])

    useEffect(() => {
        if (xMax)
            setXValue(xMax / 1000)
    }, [xMax])

    useEffect(() => {
        if (yMax)
            setYValue(yMax)
    }, [yMax])

    const transformConfig = { pan: { enabled: false }, pinch: { enabled: false } }

    const yAxis = useMemo(() => ([{
        font,
        tickCount: 5,
        domain: [Y_MIN, yMax]
    }]), [font, yMax])

    return {
        data: history,
        xKey: 'x',
        yKeys: ['y'],
        transformState: state,
        viewport: viewport,
        xAxis,
        yAxis,
        transformConfig,
        yValue,
        xValue,
        setYValue,
        setXValue
    }
}