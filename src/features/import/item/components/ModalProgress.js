import React from 'react'
import {  Icon, Text } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import { Bar } from 'react-native-progress'
import { basic, primary, basic300 } from '../../../../styles/colors'
import { labels } from '../../../../constants/constants'
import ModalTitle from './ModalTitle'

const ModalProgress = ({
    count,
    itemType,
    hideModal,
    currentIndex
}) => {
    return (
            <View style={styles.borderView}>
                <View style={styles.mainBar}>
                    <Icon style={styles.fileIcon}
                        name='file-text-outline'
                        fill={basic} />
                    <View>
                        <Text
                            category='s2'
                            appearance='hint'
                            style={styles.barText}>
                            {labels[itemType].label} {currentIndex + 1}/{count}
                        </Text>
                        <Bar
                            color={primary}
                            animated={true}
                            progress={.3} />
                    </View>
                </View>
            </View>
    )

}

export default ModalProgress


const styles = StyleSheet.create({
    fileIcon: {
        width: 35,
        height: 35,
        marginRight: 6
    },
    mainBar: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    borderView: {
        margin: 12,
        flex: 1,
        borderWidth: 0,
        justifyContent: 'center',
        borderColor: basic300,
        borderStyle: "dashed",
        alignItems: 'center'
    },
    barText: {
        paddingBottom: 6
    },
})