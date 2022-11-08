import React, { useState } from 'react'
import { sendRequest } from '../../database/db'
import { ActivityIndicator, Modal, View, StyleSheet } from 'react-native'
import { Button, Text } from '@ui-kitten/components'
import { errorHandler, warningHandler } from '../errorHandler'
import { androidStyle, basic200, primary } from '../../styles/GlobalStyle'
import FlatList from '../_Stateless/List/FlatList'
import SingleIconButton from '../_Stateless/SingleIconButton'
import HistoryListItem from '../_Stateless/Calculator/HistoryListItem'
import { getFormattedDate } from '../customFunctions'
import { calculatorTypes } from '../../constants/constants'
import EmptyListComponent from '../_Stateless/EmptyListComponent'
import ModalTopBar from '../_Stateless/Calculator/ModalTopBar'
import LoadingView from '../_Stateless/Settings/LoadingView'
import MainActionButton from '../_Stateless/MainActionButton'
import { trashIcon } from '../_Stateless/Icons'


const HistoryModal = (props) => {
    const [visible, setVisible] = useState(false)
    const [historyList, setHistoryList] = useState([])
    const [loading, setLoading] = useState(true)

    const displayModal = React.useCallback(async () => {
        setVisible(true)
        const dataList = await sendRequest('SELECT', 'CALCULATOR', { calculatorType: props.calculatorType })
        if (dataList.status === 200) {
            setHistoryList(dataList.result)
            setLoading(false)
        }
        else {
            errorHandler(dataList.status)
        }
    }, [setLoading, setHistoryList, setVisible])

    const hideModal = React.useCallback(() => {
        setVisible(false)
        setLoading(true)
    }, [setVisible, setLoading])

    const loadCalculatorHandler = React.useCallback(async (data, id) => {
        setLoading(true)
        setTimeout(() => { props.loadHandler(data, id) }, 20)
        setVisible(false)
    }, [props.loadHandler, setLoading, setVisible])

    const renderItem = React.useCallback(({ item, index }) => {
        return (
            <HistoryListItem
                active={props.activeCalculatorId === item.id}
                onPress={loadCalculatorHandler.bind(this, item.data, item.id)}
                onDeleteHandler={deleteHistoryItem.bind(this, item.id)}
                icon={calculatorTypes[props.calculatorType].icon}
                pack={calculatorTypes[props.calculatorType].pack}
                title={calculatorTypes[props.calculatorType].historyTitle + ` (${item.name})`}
                subtitle={getFormattedDate(item.timeCreated)}
            />
        )
    }, [loadCalculatorHandler, props.activeCalculatorId])

    const deleteHistoryItem = React.useCallback((id) => {
        setHistoryList(old => old.filter(item => item.id !== id))
        props.onDeleteHandler(id)
    }, [setHistoryList])

    const deleteAllHandler = React.useCallback(async () => {
        const confirm = await warningHandler(47, 'Delete all', 'Cancel')
        if (confirm) {
            setLoading(true)
            const deleteConfirm = await props.onDeleteAllHandler()
            if (deleteConfirm) {
                setVisible(false)
                props.resetCalculator()
            }
            else {
                errorHandler(601)
                setLoading(false)
            }
        }
    }, [setLoading, props.resetCalculator, props.onDeleteAllHandler, setVisible])

    return (
        <>
            <Button appearance='ghost' onPress={displayModal} style={styles.button}>History...</Button>
            <Modal
                animationType="slide"
                visible={visible}
                onRequestClose={hideModal}>
                <ModalTopBar
                    onBackPress={hideModal}
                    title='Saved calculations' />
                <LoadingView loading={loading}>
                    <FlatList
                        ListEmptyComponent={<EmptyListComponent title={'No calculations found'} description={'After completing a calculation press save button to find it here.'} icon='list-outline' />}
                        style={styles.flatList}
                        contentContainerStyle={styles.container}
                        data={historyList}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </LoadingView>
                {historyList.length > 0 ?
                    <Button
                        accessoryLeft={trashIcon}
                        style={androidStyle.SaveButton}
                        onPress={deleteAllHandler}
                        disabled={loading}


                    >Delete all</Button> : null
                }
            </Modal>
        </>
    )
}

export default HistoryModal

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    topBarBackground: {
        backgroundColor: primary,
        paddingTop: 0,
        paddingBottom: 0,
        height: 60
    },
    title: {
        paddingLeft: 24,
        paddingBottom: 5,
    },
    fullView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: basic200
    },
    flatList: {
        flex: 1,
        backgroundColor: basic200,
        paddingTop: 6
    },
    button: {
        marginVertical: 6
    },
    container: {
        paddingBottom: 72
    }
})