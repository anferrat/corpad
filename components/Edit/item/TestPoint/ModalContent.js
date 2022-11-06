import React from 'react'
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import { Text, Divider } from '@ui-kitten/components'
import { labels, potentialFields, potentialUnits, testPointTypes, testPointReadingOptions, testPointReadingsWithPotentials } from '../../../../constants/constants'
import { sendRequest } from '../../../../database/db'
import idGen from '../../../IdGen'
import ListItem from '../../../_Stateless/ListItem'
import { verifyTypes } from '../../../customFunctions'
import { errorHandler } from '../../../errorHandler'
import SingleIconButton from '../../../_Stateless/SingleIconButton'
import { androidStyle, primary } from '../../../../styles/GlobalStyle'

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
            <View style={{ ...androidStyle.TopBar, ...styles.header }}>
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
        backgroundColor: primary,
        justifyContent: 'flex-start',
        paddingTop: StatusBar.currentHeight
    }
})