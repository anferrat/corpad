import React, { useEffect } from 'react'
import { Pressable, Modal, StyleSheet, StatusBar, View } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { basic400, control, primary } from '../../../styles/colors'
import IconButton from '../../../components/IconButton'
import useMarkerSearch from '../hooks/useMarkerSearch'
import SearchModal from './search/SearchModal'

const SearchBar = ({ satelliteMode }) => {
    const { search, hideModal, showModal, openMenu, onChangeKeyword, showOnMap, resetKeyword } = useMarkerSearch()
    const { keyword, modalEnabled, markersFound, searching } = search
    const isEmpty = keyword === null

    //THIS IS SUCH A BS!!!
    if (modalEnabled)
        StatusBar.setBarStyle('dark-content')
    useEffect(() => {
        return () => modalEnabled ? StatusBar.setBarStyle(satelliteMode ? 'light-content' : 'dark-content') : null
    }, [modalEnabled])


    return (
        <>
            <Pressable
                style={styles.mainView}
                onPress={showModal}>
                <View style={styles.side}>
                    <Icon
                        pack='cp'
                        name='corpad-logo'
                        fill={primary}
                        style={styles.logo} />
                    <Text
                        appearance={keyword ? 'default' : 'hint'}
                        style={styles.text}>
                        {keyword ? keyword : 'Search by name'}
                    </Text>
                </View>
                <View
                    style={styles.icons}>
                    {
                        isEmpty ? <Icon
                            name='search-outline'
                            fill={primary}
                            style={styles.search} /> :
                            <IconButton
                                iconName={'close-circle'}
                                fill={primary}
                                onPress={resetKeyword} />
                    }
                    <IconButton
                        iconName={'more-vertical'}
                        onPress={openMenu}
                        size='small' />
                </View>
            </Pressable>
            <Modal
                hardwareAccelerated={true}
                statusBarTranslucent={true}
                animationType='fade'
                onRequestClose={hideModal}
                visible={modalEnabled}>
                <SearchModal
                    searching={searching}
                    resetKeyword={resetKeyword}
                    showOnMap={showOnMap}
                    markersFound={markersFound}
                    keyword={keyword}
                    onChangeKeyword={onChangeKeyword}
                    hideModal={hideModal} />
            </Modal>
        </>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    mainView: {
        width: '95%',
        alignSelf: 'center',
        height: 45,
        backgroundColor: control,
        top: 12,
        borderWidth: 1,
        elevation: 5,
        borderRadius: 15,
        borderColor: basic400,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logo: {
        width: 30,
        height: 30,
        marginHorizontal: 12
    },
    text: {
        marginLeft: 4,
        marginTop: 2
    },
    search: {
        width: 23,
        height: 23,
        marginRight: 10
    },
    side: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 12,
    },
})