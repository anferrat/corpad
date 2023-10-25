import React from 'react'
import { StyleSheet, Image, View, Pressable } from 'react-native'
import { basic1000, basic300, basic400, basic700, control, danger, primary } from '../../../../../styles/colors'
import { Icon } from '@ui-kitten/components'
import { androidRipple } from '../../../../../styles/styles'
import { dimensions } from './size'


const PhotoListItem = ({ uri, index, onPress, onDelete }) => {

    const onPressHandler = React.useCallback(() => {
        onPress(index)
    }, [onPress, index])

    const onDeleteHandler = React.useCallback(() => {
        onDelete(index)
    }, [onDelete, index])

    return (
        <Pressable
            style={styles.container}
            onPress={onPressHandler}>
            <Image
                style={styles.image}
                width={dimensions.length}
                height={dimensions.length}
                source={{ uri }} />
            <View style={styles.wrapper}>
                <Pressable
                    onPress={onDeleteHandler}
                    android_ripple={androidRipple}
                    style={styles.remove}>
                    <Icon
                        name='close'
                        style={styles.trashIcon}
                        fill={primary} />
                </Pressable>
            </View>
        </Pressable>
    )
}

export default PhotoListItem

const styles = StyleSheet.create({
    container: {
        paddingTop: 12
    },
    image: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: basic400,
        marginRight: dimensions.separator
    },
    remove: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    trashIcon: {
        width: 22,
        height: 22
    },
    wrapper: {
        overflow: 'hidden',
        borderRadius: 20,
        width: 30,
        height: 30,
        borderWidth: 1,
        position: 'absolute',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        right: dimensions.separator - 6,
        backgroundColor: control,
        top: 6,
        borderColor: basic700,
    }
})