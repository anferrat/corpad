import React, { useRef, useState, useCallback } from 'react'
import { View, StyleSheet, Pressable, Animated, Platform } from 'react-native'
import { Text, Icon, CircularProgressBar } from '@ui-kitten/components'
import { basic, basic300 } from '../../../styles/colors'
import { androidRipple } from '../../../styles/styles'
import { getFormattedDate } from '../../../helpers/functions'
import SurveyFileListItemMenu from './SurveyFileListItemMenu'
import SurveyFileListItemMenuItem from './SurveyFileListItemMenuItem'
import SurveyFileListItemIconBar from './SurveyFileListItemIconBar'

const SurveyFileListItem = ({ name, fileName, timeModified, tpCount, rectifierCount, pipelineCount, passedItems, cloudId, path, hash, isCloud, loadSurvey, deleteSurvey, removeSurveyFromList, shareSurveyLink, shareSurveyFile, copyToAlternateFolder, copyToDownloads }) => {
    const scale = useRef(new Animated.Value(1))
    const isAndroid = Platform.OS === 'android'
    const [menuVisible, setMenuVisible] = useState(false)

    const showMenu = useCallback(() => setMenuVisible(true), [])

    const hideMenu = useCallback(() => setMenuVisible(false), [])

    const handleDelete = React.useCallback(async () => {
        hideMenu()
        const success = await deleteSurvey({ path, cloudId, hash, fileName })
        if (success) {
            Animated.timing(scale.current, {
                toValue: 0,
                duration: 400,
                useNativeDriver: false
            }).start(() => removeSurveyFromList({ path, cloudId }))
        }
    }, [path, cloudId, hash, fileName])

    const handleLoadSurvey = useCallback(() => {
        hideMenu()
        loadSurvey({ path, cloudId, fileName })

    }, [path, cloudId, fileName])

    const handleShareSurveyLink = useCallback(() => {
        hideMenu()
        shareSurveyLink({ cloudId, fileName })

    }, [cloudId, fileName])

    const handleShareSurveyFile = useCallback(() => {
        hideMenu()
        shareSurveyFile({ path, cloudId, fileName })
    }, [path, cloudId, fileName])

    const handleCopyToDownloads = useCallback(() => {
        hideMenu()
        copyToDownloads({ path, cloudId, fileName })

    }, [path, cloudId, fileName])

    const handleCopyToAlternateFolder = useCallback(() => {
        hideMenu()
        copyToAlternateFolder({ path, cloudId, fileName })

    }, [path, cloudId, fileName])

    return (
        <Animated.View style={{
            height: scale.current.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 140],
            }),
            transform: [{ scale: scale.current }]
        }}>
            <Pressable style={styles.pressable}
                android_ripple={androidRipple}
                onPress={handleLoadSurvey}>
                <View style={styles.mainView} >
                    <View style={styles.titleView}>
                        <CircularProgressBar
                            progress={passedItems}
                            animating={false}
                            status='success'
                            style={styles.circle}
                            size='large' />
                        <View
                            style={styles.titleData}>
                            <Text
                                category='h5'
                                numberOfLines={1}
                                ellipsizeMode={'tail'}>
                                {name}
                            </Text>
                            <View style={styles.titleRow}>
                                <Icon
                                    name={isCloud ? 'cloud' : 'smartphone'}
                                    style={isCloud ? styles.cloudIcon : styles.smallIcon}
                                    fill={basic}
                                    pack={isCloud ? 'cp' : null} />
                                <Text
                                    style={styles.fileName}
                                    numberOfLines={1}
                                    ellipsizeMode={'middle'}
                                    appearance='hint'
                                    category='s1'>
                                    {fileName}
                                </Text>
                            </View>
                            <View
                                style={styles.time}>
                                <Icon
                                    name='clock-outline'
                                    style={styles.smallIcon}
                                    fill={basic} />
                                <Text
                                    appearance='hint'
                                    category='s1'>
                                    {getFormattedDate(timeModified)}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <SurveyFileListItemMenu
                        showMenu={showMenu}
                        hideMenu={hideMenu}
                        visible={menuVisible}>
                        {isAndroid ? <SurveyFileListItemMenuItem
                            onPress={handleCopyToDownloads}
                            title='Save to Downloads'
                            icon='download-outline' /> : null}
                        <SurveyFileListItemMenuItem
                            onPress={handleCopyToAlternateFolder}
                            title={`Copy to ${isCloud ? 'device' : 'cloud'}`}
                            icon={isCloud ? 'smartphone-outline' : 'cloud-download-outline'} />
                        <SurveyFileListItemMenuItem
                            onPress={handleShareSurveyFile}
                            title={`Share file`}
                            icon={isAndroid ? 'share-outline' : 'external-link-outline'} />
                        {isCloud ?
                            <SurveyFileListItemMenuItem
                                onPress={handleShareSurveyLink}
                                title={`Share link`}
                                icon={'link-2-outline'} /> : null}
                        <SurveyFileListItemMenuItem
                            status='danger'
                            onPress={handleDelete}
                            title='Delete'
                            icon='trash-outline' />
                    </SurveyFileListItemMenu>
                </View>
                <SurveyFileListItemIconBar
                    tpCount={tpCount}
                    pipelineCount={pipelineCount}
                    rectifierCount={rectifierCount} />
            </Pressable>
        </Animated.View>
    )
}

export default SurveyFileListItem


const styles = StyleSheet.create({
    mainView: {
        height: 100,
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
        flex: 1,
        alignItems: 'center',
    },
    pressable: {
        elevation: 5,
        backgroundColor: '#fff',
        marginHorizontal: 6,
        marginTop: 12,
        borderRadius: 12
    },
    circle: {
        marginRight: 20,
    },
    smallIcon: {
        width: 16,
        height: 16,
        marginRight: 6,
    },
    cloudIcon: {
        width: 16,
        height: 16,
        marginTop: 4,
        marginRight: 6,
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
    fileName: {
        flex: 1,
    }
})