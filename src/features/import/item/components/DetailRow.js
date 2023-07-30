import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import IconButton from '../../../../components/IconButton'
import { warning, danger, primary } from '../../../../styles/colors'
import WarningPoints from './WarningPoints'
import Pressable from '../../../../components/Pressable'

const DetailRow = ({ index, warnings, success }) => {
    const [expanded, setExpanded] = useState(false)

    const expandAction = React.useCallback(() => { setExpanded(old => !old) }, [])
    return (
        <View style={styles.mainView}>
            <Pressable
                style={styles.row}
                onPress={expandAction}>
                <View>
                    <View style={styles.title}>
                        <Icon name={'hash-outline'} style={{ width: 18, height: 18, marginRight: 6, marginTop: 2 }} fill={primary} />
                        <Text category='p1'>Row {index + 1}</Text>
                    </View>
                    <View style={styles.subtitle}>
                        {success ?
                            <>
                                <Text status='warning' category='c2'>{warnings.length} warning{warnings.length !== 1 ? 's' : ''}</Text>
                                <Icon name={'alert-triangle-outline'} style={styles.icon} fill={warning} />
                            </>
                            :
                            <>
                                <Text status='danger' category='c2'>Error</Text>
                                <Icon style={styles.icon} name={'alert-circle-outline'} fill={danger} />
                            </>
                        }
                    </View>
                </View>
                <IconButton
                    iconName={expanded ? 'chevron-up-outline' : 'chevron-down-outline'}
                    onPress={expandAction} />
            </Pressable>
            <WarningPoints
                expanded={expanded}
                warnings={warnings}
                success={success} />
        </View>
    )
}

export default React.memo(DetailRow, () => true)

const styles = StyleSheet.create({
    mainView: {
        paddingVertical: 6,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        width: 14,
        height: 14,
        marginLeft: 6
    },
    subtitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})