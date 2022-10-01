import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Pressable, Animated } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import { basic, basic200, basic300 } from '../../../styles/GlobalStyle'
import { getFormattedDate } from '../../customFunctions'
import FileListItemMenu from './FileListItemMenu'
import * as Progress from 'react-native-progress'
import { success } from '../../../styles/GlobalStyle'
import { warningHandler } from '../../errorHandler'


const FileListItem = (props) => {
    const progress = props.tpCount !== 0 ? props.good / props.tpCount : 0
    const scale = useRef(new Animated.Value(1))
    const [deleting, setDeleting] = useState(false)

    const onDeleteHandler = React.useCallback(async () => {
        const confirmDelete = await warningHandler(43, 'Delete')
        if (confirmDelete) {
            setDeleting(true)
        }
    }, [setDeleting])

    useEffect(() => {
        const deleteResult = async () => {
            const delRes = await props.onDeleteHandler()
            if (delRes.status !== 200) {
                setDeleting(false)
                scale.current.setValue(1)
            }
        }
        if (deleting)
            Animated.timing(scale.current, {
                toValue: 0,
                duration: 400,
                useNativeDriver: false
            }).start(deleteResult)
    }, [deleting])

    return (
        <Animated.View style={{
            height: scale.current.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 130],
            }),
            transform: [{ scale: scale.current }]
        }}>
            <Pressable style={styles.pressable} android_ripple={{ color: basic200 }} onPress={props.onPress}>
                <View style={styles.mainView} >
                    <View style={styles.titleView}>
                        <Progress.Circle
                            fill={'none'}
                            style={styles.circle}
                            animated={false}
                            color={success}
                            progress={progress}
                            size={70}
                            unfilledColor={basic200}
                            borderWidth={0}
                            thickness={12}
                            endAngle={0.7}
                            showsText={true} />
                        <View style={styles.titleData}>
                            <View style={styles.titleRow}>
                                <Text category='h5' numberOfLines={1} ellipsizeMode={'tail'}>{props.title}</Text>
                                {props.isCloud ? <Icon name='cloud-download-outline' style={styles.titleIcon} fill={basic} /> : null}
                            </View>
                            <Text appearance='hint' category='p2'>Pipeline survey</Text>
                            <View style={styles.time}>
                                <Icon name='clock-outline' style={styles.smallIcon} fill={basic} />
                                <Text appearance='hint' category='p2' > {getFormattedDate(props.timeModified)}</Text>
                            </View>
                        </View>
                    </View>
                    <FileListItemMenu menuItems={[...props.menuItems, { title: 'Delete', onPress: onDeleteHandler }]} />
                </View>
                <View style={styles.iconBar}>
                    <Icon name={'TSS'} pack='cp' style={styles.barIcon} fill={basic} />
                    <Text appearance={'hint'} category='s2' style={styles.text}>{props.tpCount}</Text>
                    <Icon name={'PL'} pack='cp' style={styles.barIcon} fill={basic} />
                    <Text appearance={'hint'} category='s2' style={styles.text}>{props.pipelineCount}</Text>
                    <Icon name={'RT'} pack='cp' style={styles.barIcon} fill={basic} />
                    <Text appearance={'hint'} category='s2' style={styles.text}>{props.rectifierCount}</Text>
                </View>
            </Pressable>
        </Animated.View>
    )
}

export default React.memo(FileListItem, (prev, next) => (prev.path === next.path) && (prev.hash === next.hash))
// for future

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: basic300,
        paddingHorizontal: 12,
        paddingTop: 6
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    pressable: {
        elevation: 5,
        backgroundColor: '#fff',
        marginHorizontal: 6,
        marginTop: 12,
        borderRadius: 12
    },
    circle: {
        marginRight: 24,
    },
    barIcon: {
        width: 15,
        height: 15,
        marginRight: 3,
    },
    smallIcon: {
        width: 18,
        height: 18,
        marginRight: 2,
    },
    titleIcon: {
        width: 20,
        height: 20,
        marginLeft: 6,
        marginTop: 4
    },
    time: {
        marginTop: 4,
        alignItems: 'center',
        flexDirection: 'row',
    },
    titleView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleData: {
        flex: 1,
        marginRight: 12,
        paddingBottom: 12
    },
    iconBar: {
        padding: 6,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        marginRight: 12
    }
})