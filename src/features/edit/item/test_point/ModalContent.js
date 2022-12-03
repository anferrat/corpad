import React from 'react'
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import { Text, Divider } from '@ui-kitten/components'
import { labels, potentialFields, potentialUnits, testPointTypes, testPointReadingOptions, testPointReadingsWithPotentials } from '../../../../constants/constants'
import { sendRequest } from '../../../../api/database/index'
import idGen from '../../../../helpers/id_generator'
import ListItem from '../components/ListItem'
import { verifyTypes } from '../../../../helpers/functions'
import { errorHandler } from '../../../../helpers/error_handler'
import SingleIconButton from '../../../../components/IconButton'
import { primary } from '../../../../styles/colors'

const ModalContent = (props) => {
    const addReadingAction = async (cardType) => {
        props.closeModal()
        const settings = await sendRequest('SELECT', 'SETTINGS', {})
        const newCardId = await sendRequest('INSERT', 'CARD', { uid: idGen(), testPointId: props.testPointId, type: cardType })
        if (settings.status === 200 && newCardId.status === 200) {
            if (!!settings.result.autoCreatePotentials)
                if (verifyTypes(cardType, testPointReadingsWithPotentials)) {
                    //if unable to insert default potentials - fail silently
                    await sendRequest('INSERT', 'POTENTIAL_BY_TYPE', { cardId: newCardId.result, uid: idGen(), permType: potentialFields[0].permType, unit: potentialUnits[settings.result.defaultPotentialUnit] })
                    await sendRequest('INSERT', 'POTENTIAL_BY_TYPE', { cardId: newCardId.result, uid: idGen(), permType: potentialFields[1].permType, unit: potentialUnits[settings.result.defaultPotentialUnit] })
                }
            props.navigateToCard(newCardId.result, true, cardType)
        }
        else errorHandler(606)
    }

    const genCardOptions = (cardList) => cardList.map(cardCode =>
        <ListItem
            key={'Title option - ' + labels[cardCode]?.label}
            title={labels[cardCode]?.label}
            pack='cp'
            onPress={addReadingAction.bind(this, cardCode)}
            iconName={cardCode + '-filled'} />)
    return (
        <View style={styles.mainView}>
            <View style={styles.header}>
                <SingleIconButton
                    onPress={props.closeModal}
                    color='#fff'
                    iconName='arrow-back-outline' />
                <Text category='h5' style={styles.mainTitle} status='control'>Select reading:</Text>
            </View>

            <Divider />
            <ScrollView>
                <Text category='h6' style={styles.sectionTitle} appearance='hint'>{testPointTypes[props.testPointType]}</Text>
                {genCardOptions(testPointReadingOptions[props.testPointType])}
            </ScrollView>
        </View>
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