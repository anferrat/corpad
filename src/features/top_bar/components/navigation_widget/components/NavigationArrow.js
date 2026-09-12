import { useCallback, useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
    IOSReferenceFrame,
    SensorType,
    useAnimatedReaction,
    useAnimatedSensor,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { Icon } from '@ui-kitten/components'
import { primary } from '../../../../../styles/colors'
import { calculateAngularDistance, calculateRotationAngle, calculateTiltCompensatedAngle } from '../helpers/functions'

const SENSOR_INTERVAL = 50
const SENSOR_TIMEOUT = 5000
const ANGLE_DEADBAND = 2

const NavigationArrow = ({ bearing, loading, onReady, onUnavailable }) => {
    const sensor = useAnimatedSensor(SensorType.ROTATION, {
        interval: SENSOR_INTERVAL,
        adjustToInterfaceOrientation: true,
        iosReferenceFrame: IOSReferenceFrame.XMagneticNorthZVertical
    })
    const targetBearing = useSharedValue(bearing)
    const arrowRotation = useSharedValue(0)
    const previousAngle = useSharedValue(null)
    const sensorReported = useSharedValue(false)
    const arrowReported = useSharedValue(false)
    const receivedReading = useRef(false)

    useEffect(() => {
        targetBearing.value = bearing
    }, [bearing, targetBearing])

    const markSensorReady = useCallback(() => {
        receivedReading.current = true
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!receivedReading.current)
                onUnavailable()
        }, SENSOR_TIMEOUT)

        return () => clearTimeout(timeout)
    }, [onUnavailable])

    useAnimatedReaction(
        () => {
            const attitude = sensor.sensor.value
            const hasSensorReading = attitude.qw !== 0 || attitude.qx !== 0 || attitude.qy !== 0 || attitude.qz !== 0
            return {
                attitude,
                hasSensorReading,
                angle: hasSensorReading ? calculateTiltCompensatedAngle(targetBearing.value, attitude) : null
            }
        },
        current => {
            if (current.hasSensorReading && !sensorReported.value) {
                sensorReported.value = true
                scheduleOnRN(markSensorReady)
            }

            if (current.angle === null)
                return

            const nextAngle = calculateRotationAngle(previousAngle.value, current.angle)
            const angleDelta = previousAngle.value === null
                ? null
                : calculateAngularDistance(previousAngle.value, current.angle)
            if (angleDelta !== null && angleDelta < ANGLE_DEADBAND)
                return

            previousAngle.value = nextAngle
            arrowRotation.value = withTiming(nextAngle, { duration: 120 })

            if (!arrowReported.value) {
                arrowReported.value = true
                scheduleOnRN(onReady)
            }
        },
        [markSensorReady, onReady])

    const arrowStyle = useAnimatedStyle(() => ({
        opacity: loading ? 0 : 1,
        transform: [{ rotate: `${arrowRotation.value}deg` }]
    }), [loading])

    return (
        <Animated.View style={[styles.arrow, arrowStyle]}>
            <Icon
                name='navigation'
                fill={primary}
                style={styles.icon} />
        </Animated.View>
    )
}

export default NavigationArrow

const styles = StyleSheet.create({
    arrow: {
        height: 104,
        marginTop: 12,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 80,
        height: 80
    }
})
