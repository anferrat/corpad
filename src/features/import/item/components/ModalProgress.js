import React from 'react'
import { Icon, Text, ProgressBar } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import { basic, primary, basic300 } from '../../../../styles/colors'
import ModalTitle from './ModalTitle'
import { ItemTypeLabels } from '../../../../constants/labels'

const ModalProgress = ({
    count,
    itemType,
    currentIndex
}) => {
    return (
        <View style={styles.borderView}>
            <ModalTitle
                title="Importing"
                iconFill={primary}
                icon='activity'
            />
            <View style={styles.mainBar}>
                <Icon style={styles.fileIcon}
                    name='file-text-outline'
                    fill={basic} />
                <View style={styles.progressBar}>
                    <Text
                        category='s2'
                        appearance='hint'
                        style={styles.barText}>
                        {ItemTypeLabels[itemType]} {currentIndex + 1}/{count}
                    </Text>
                    <ProgressBar
                        status='primary'
                        animating={false}
                        progress={(currentIndex + 1) / count} />
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
        margin: 12,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    borderView: {
        flex: 1,
        borderWidth: 0,
        borderColor: basic300,
        borderStyle: "dashed",
    },
    barText: {
        paddingBottom: 6
    },
    progressBar: {
        width: '80%'
    }
})