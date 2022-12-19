import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import IconButton from '../../../../components/IconButton'
import { basic } from '../../../../styles/colors'


const AttributeMapElement = (props) => {
    return (
        <>
            <View style={styles.mainView}>
                <View style={styles.leftBlock}>
                    <View style={styles.standardValue}>
                        {props.icon ?
                            <Icon name={props.icon.icon} fill={props.icon?.fill ?? basic} style={styles.icon} pack={props.icon.pack} />
                            : null}
                        <Text style={styles.standardValueText}>{props.standardValue}</Text>
                    </View>
                            <Icon name='arrow-back-outline'
                                fill={basic}
                                style={styles.iconArrow} />
                </View>
                <View style={styles.rightBlock}>
                    <Text category='s2' appearance='hint'>{props.mappedValues.join(', ')}</Text>
                </View>
                <View style={styles.deleteButton}>
                    <IconButton
                        iconName='close-outline'
                        size='small'
                        onPress={props.onDelete} />
                </View>
            </View>
        </>
    )
}

export default React.memo(AttributeMapElement)

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        paddingVertical: 12,
        alignItems: 'center'
    },
    leftBlock: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rightBlock: {
        flex: 1,
    },
    flatList: {
        flex: 1
    },
    icon: {
        width: 20,
        height: 20,
    },
    iconArrow: {
        width: 20,
        height: 20,
        marginRight: 16,
    },
    standardValue: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    standardValueText: {
        marginLeft: 6,
    },
    deleteButton: {
        flexBasis: 60,
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
})