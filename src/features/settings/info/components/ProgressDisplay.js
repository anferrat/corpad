import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { CircularProgressBar } from '@ui-kitten/components'
import { StatusColors, basic, danger, success, warning } from '../../../../styles/colors'
import LegendItem from './LegendItem'
import ButtonSelector from '../../../../components/ButtonSelector'
import { calculateProgress } from '../helpers/functions'
import { ItemStatuses, ItemTypes } from '../../../../constants/global'
import { StatusLabels } from '../../../../constants/labels'
import { StatusIcons } from '../../../../constants/icons'

const buttons = [
    { title: 'Test points' },
    { title: 'Rectifiers' }
]

const statusColors = [success, warning, danger, basic]


const ProgressDisplay = ({ status, count }) => {
    const [activeItem, setActiveItem] = useState(0)
    const itemType = !activeItem ? ItemTypes.TEST_POINT : ItemTypes.RECTIFIER

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
                    <CircularProgressBar
                        progress={calculateProgress(status, count, itemType)}
                        animating={true}
                        status='success'
                        style={styles.progressCircle}
                        size='giant' />

                </View>
                <View style={styles.legend}>
                    {
                        Object.values(ItemStatuses).filter(s => s !== ItemStatuses.NO_STATUS).map(s => (
                            <LegendItem
                                key={s}
                                text={`${StatusLabels[s]} (${status[itemType][s]})`}
                                color={StatusColors[s]}
                                icon={StatusIcons[s]} />
                        ))
                    }
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
    },
    progressCircle: {
        height: 140,
        width: 140
    }
})