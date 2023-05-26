import React from "react"
import { View, StyleSheet, Pressable } from "react-native"
import { Icon, Text } from "@ui-kitten/components"
import { basic, basic200, basic300, primary } from '../../../../styles/colors'
import { androidRipple } from "../../../../styles/styles"
import IconButton from '../../../../components/IconButton'
import { ReferenceCellTypeLabels, ReferenceCellCodeLabels } from "../../../../constants/labels"

const RefCellItem = ({ selected, updateMain, name, rcType, deleteReference, id }) => {

    const onDeleteHandler = React.useCallback(() => {
        if (!selected)
            deleteReference(id)
    }, [selected, deleteReference, id])

    const onUpdateHandler = React.useCallback(() => {
        if (!selected)
            updateMain(id)
    }, [selected, updateMain, id])

    return (
        <Pressable
            style={selected ? styles.mainViewChecked : styles.mainView}
            android_ripple={androidRipple}
            onPress={onUpdateHandler}>
            <View style={styles.titleView}>
                <Icon
                    name='RE'
                    pack='cp'
                    fill={primary}
                    style={styles.icon} />
                <View>
                    <Text
                        category='p1'>
                        {name}
                    </Text>
                    <Text
                        category='s2'
                        appearance='hint'>
                        {`${ReferenceCellTypeLabels[rcType]} (${ReferenceCellCodeLabels[rcType]})`}
                    </Text>
                </View>
            </View>
            {selected ?
                <Icon
                    fill={primary}
                    style={styles.check}
                    name='checkmark-circle-2' />
                : <IconButton
                    iconName='close-circle'
                    color={basic}
                    size='small'
                    onPress={onDeleteHandler} />
            }
        </Pressable>
    )
}

export default React.memo(RefCellItem)

const styles = StyleSheet.create({
    mainView: {
        height: 60,
        flexDirection: "row",
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderRadius: 6,
        marginBottom: 8,
        borderColor: basic300,
    },
    mainViewChecked: {
        height: 60,
        flexDirection: "row",
        alignItems: 'center',
        backgroundColor: basic200,
        padding: 12,
        borderWidth: 1,
        borderRadius: 6,
        marginBottom: 8,
        borderColor: basic300,
    },

    titleView: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    icon: {
        marginRight: 12,
        marginLeft: 6,
        width: 18,
        height: 18
    },
    check: {
        width: 20,
        height: 20,
        marginHorizontal: 8
    }
})