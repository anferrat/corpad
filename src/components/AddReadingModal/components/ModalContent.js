import React from 'react'
import { StyleSheet, StatusBar, View, ScrollView } from 'react-native'
import { Text } from '@ui-kitten/components'
import { primary } from '../../../styles/colors'
import { testPointTypes, testPointReadingOptions, labels } from '../../../constants/constants'
import Header from './Header'
import ListItem from './ListItem'

const ModalContent = ({ onSelect, hideModal }) => {

    const onSelectHandler = (cardType) => {
        onSelect(cardType)
        hideModal()
    }

    const renderItem = React.useCallback((cardList) => cardList.map(cardCode => (
        <ListItem
            key={`SelectCard_${cardCode}`}
            title={labels[cardCode]?.label}
            pack='cp'
            onPress={onSelectHandler.bind(this, cardCode)}
            iconName={`${cardCode}-filled`} />
    )), [onSelect])

    const renderSection = () => {
        return testPointTypes.filter((_, index) => index < 2).map((type, index) => {
            return (
                <View
                    key={`Section_${type}`}>
                    <Text category='h6' style={styles.sectionTitle} appearance='hint'>{index === 0 ? `${type} / ${testPointTypes[2]}` : type}</Text>
                    {renderItem(testPointReadingOptions[index])}
                </View>
            )
        })
    }

    return (
        <>
            <Header
                onBackPress={hideModal} />
            <ScrollView>
                {renderSection()}
            </ScrollView>
        </>
    )
}

export default React.memo(ModalContent)

const styles = StyleSheet.create({
    mainView:
    {
        flex: 1
    },
    sectionTitle: {
        padding: 6,
    },
    mainTitle: {
        paddingLeft: 12
    },
    header: {
        height: StatusBar.currentHeight + 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        backgroundColor: primary,
        justifyContent: 'flex-start',
        paddingTop: StatusBar.currentHeight
    }
})