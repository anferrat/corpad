import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import * as Progress from 'react-native-progress'
import { basic, danger, success, warning } from '../../../styles/GlobalStyle'
import LegendItem from '../../_Stateless/Info/LegendItem'
import ButtonSelector from '../../_Stateless/ButtonSelector'

const ProgressDisplay = (props) => {
    const [activeItem, setActiveItem] = useState(0)
    const [justLoaded, setJustLoaded] = useState(true)
    const progress = props.data[activeItem].total !== 0 ? props.data[activeItem].pass / props.data[activeItem].total : 0
    const updateActive = React.useCallback((active, newActive) => {
        if (active !== newActive)
            setActiveItem(newActive)
    },
        [])

    //for start animation in ProgressCycle
    useEffect(() => {
        setJustLoaded(false)
    }, [])

    return (
        <View style={styles.mainView}>
            <ButtonSelector
                selectedIndex={activeItem}
                setSelected={setActiveItem}
                buttons={[
                    { title: 'Test points' },
                    { title: 'Rectifiers' }
                ]}
            />
            <View style={styles.progress}>
                <Progress.Circle
                    fill="none"
                    style={styles.circle}
                    animated={true}
                    color={success}
                    progress={justLoaded ? 0 : progress}
                    size={140}
                    borderWidth={0}
                    thickness={16}
                    endAngle={0.7}
                    textStyle={styles.textStyle}
                    showsText={true} />
                <View style={styles.legend}>
                    <LegendItem text={`Pass (${props.data[activeItem].pass})`} color={success} icon='checkmark-circle' />
                    <LegendItem text={`Attention (${props.data[activeItem].attention})`} color={warning} icon='alert-triangle-outline' />
                    <LegendItem text={`Issue (${props.data[activeItem].issue})`} color={danger} icon='alert-circle-outline' />
                    <LegendItem text={`Unknown (${props.data[activeItem].unknown})`} color={basic} icon='question-mark-circle-outline' />
                </View>
            </View>
        </View>
    )
}

export default ProgressDisplay

const styles = StyleSheet.create({
    mainView: {
        paddingBottom: 12,
        flexBasis: 230,
    },
    circle: {
        flexBasis: 140
    },
    progress: {
        flex: 1,
        marginTop: 24,
        justifyContent: 'space-evenly',
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
        flexBasis: 170,
        padding: 12,
    }
})