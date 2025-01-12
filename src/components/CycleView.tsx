import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import { basic200, basic300, basic400, basic700, control, success100 } from '../styles/colors'

type CycleViewProps = {
    onTime: number,
    offTime: number,
    firstCycleOn: boolean
}

const safetyCheck = (value: any) => isNaN(value) ? 1 : value


const CycleView = ({ onTime, offTime, firstCycleOn }: CycleViewProps): React.JSX.Element => {
    const cycleTime = onTime + offTime
    const onFlex = safetyCheck(onTime / cycleTime)
    const offFlex = safetyCheck(offTime / cycleTime)

    const renderCycle = (isOn: boolean) => {
        return <View
            style={{
                flex: isOn ? onFlex : offFlex,
                ...styles.cycleView,
                backgroundColor: isOn ? control : basic200
            }}>
            <Text


                category='s2'
            >{isOn ? 'On' : 'Off'}: <Text

                category='s2'
            >{isOn ? onTime : offTime} ms</Text></Text>
        </View>
    }
    return (
        <View
            style={styles.container}>
            {
                firstCycleOn ? <>
                    {renderCycle(true)}
                    {renderCycle(false)}
                </> :
                    <>
                        {renderCycle(false)}
                        {renderCycle(true)}
                    </>
            }
        </View>
    )
}


export default CycleView

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 35,
        borderWidth: 1,
        borderColor: basic400,
        borderRadius: 15,
        overflow: 'hidden'
    },
    cycleView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexBasis: 80
    }
})