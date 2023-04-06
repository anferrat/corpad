import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import * as Progress from 'react-native-progress'
import { basic, danger, success, warning } from '../../../../styles/colors'
import LegendItem from './LegendItem'
import ButtonSelector from '../../../../components/ButtonSelector'
import { statusInfo } from '../../../../constants/constants'
import { calculateProgress } from '../helpers/functions'

const buttons = [
    { title: 'Test points' },
    { title: 'Rectifiers' }
]

const statusColors = [success, warning, danger, basic]


const ProgressDisplay = ({ status, count }) => {
    const [activeItem, setActiveItem] = useState(null)
    const itemType = activeItem === null ? null : (activeItem === 0 ? 'TEST_POINT' : 'RECTIFIER')

    useEffect(() => {
        //for start animation in ProgressCycle
        setActiveItem(0)
    }, [])

    return (
        <View style={styles.mainView}>
            <View style={styles.selector}>
                <ButtonSelector
                    selectedIndex={activeItem}
                    setSelected={setActiveItem}
                    buttons={buttons} />
            </View>
            <View style={styles.progress}>
                <View style={styles.circle}>
                    <Progress.Circle
                        fill="none"
                        animated={true}
                        color={success}
                        progress={calculateProgress(status, count, itemType)}
                        size={140}
                        borderWidth={0}
                        thickness={16}
                        endAngle={0.7}
                        textStyle={styles.textStyle}
                        showsText={true} />
                </View>
                <View style={styles.legend}>
                    {statusInfo.map(({ title, icon }, index) => (
                        <LegendItem
                            key={title}
                            text={`${title} (${status[itemType] ? status[itemType][index] : 0})`}
                            color={statusColors[index]}
                            icon={icon} />
                    ))}
                </View>
            </View>
        </View>
    )
}

export default ProgressDisplay

const styles = StyleSheet.create({
    mainView: {
        paddingBottom: 12
    },
    selector: {
        paddingBottom: 12,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    circle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progress: {
        marginTop: 24,
        alignItems: 'center',
        justifyContent: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    tabView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    progressText: {
        fontSize: 18
    },
    legend: {
        flex: 1,
        paddingLeft: 24
    }
})