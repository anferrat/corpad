import React from "react"
import { View, StyleSheet } from "react-native"
import { Icon, Text } from "@ui-kitten/components"
import { basic, basic300, primary } from '../../../../styles/colors'
import { androidRipple } from "../../../../styles/styles"
import SingleIconButton from '../../../../components/IconButton'
import Pressable from "../../../../components/Pressable"

const PotentialListItem = ({ name, id, custom, deletePotential }) => {

    const onDeleteHandler = () => deletePotential(id)

    return (
        <Pressable
            style={styles.mainView}
            android_ripple={androidRipple} >
            <View style={styles.titleView}>
                <Icon
                    name={'grid'}
                    fill={primary}
                    style={styles.icon} />
                <View>
                    <Text category='p1'>{name}</Text>
                </View>
            </View>
            {custom ?
                <SingleIconButton
                    iconName='close-circle'
                    color={basic}
                    size='small'
                    onPress={onDeleteHandler}
                />
                : null}
        </Pressable>
    )
}

export default React.memo(PotentialListItem)

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
})