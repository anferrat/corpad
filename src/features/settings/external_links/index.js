import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { globalStyle } from '../../../styles/styles'
import { Button, Text } from '@ui-kitten/components'
import useExternalLinkSettings from './hooks/useExternalLinkSettings'
import LoadingView from '../../../components/LoadingView'
import EmptyListComponent from './components/EmptyListComponent'
import ExternalLinkListItem from './components/ExternalLinkListItem'
import BottomButton from '../../../components/BottomButton'


const ExternalLinkSettings = ({ navigateToExternalLink }) => {
    const {
        records,
        loading,
        canScanLabel,
        scanDisabled,
        onViewLink,
        onDeleteAll,
        onReadTagIos
    } =
        useExternalLinkSettings({ navigateToExternalLink })
    return (
        <>
            <ScrollView
                contentContainerStyle={styles.scrollview}>
                <View
                    style={styles.container}>
                    <LoadingView
                        style={styles.loading}
                        loading={loading} >
                        {canScanLabel ?
                            <Button
                                disabled={scanDisabled}
                                appearance='outline'
                                onPress={onReadTagIos}
                                style={styles.button}>
                                Read NFC label
                            </Button>
                            : null}
                        <View
                            style={styles.list}>
                            <Text
                                style={styles.listTitle}
                                appearance='hint'
                                category='label'>
                                Recently scanned labels
                            </Text>
                            {records.length === 0 ?
                                <EmptyListComponent /> :
                                records.map(({ id, name, linkType, itemType, link, timeRecorded }) => (
                                    <ExternalLinkListItem
                                        key={id}
                                        name={name}
                                        timeRecorded={timeRecorded}
                                        itemType={itemType}
                                        linkType={linkType}
                                        onPress={onViewLink}
                                        link={link} />
                                ))}
                        </View>
                    </LoadingView>
                </View>
            </ScrollView>
            <BottomButton
                onPress={onDeleteAll}
                title='Delete all'
                icon='trash'
                disabled={loading || (records.length === 0)}
            />
        </>
    )
}

export default ExternalLinkSettings

const styles = StyleSheet.create({
    container: {
        ...globalStyle.card,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollview: {
        paddingBottom: 72,
    },
    list: {
        flex: 1,
        width: '100%',
    },
    listTitle: {
        marginBottom: 6
    },
    button: {
        marginBottom: 24,
        marginTop: 12,
        flex: 1,
        width: '100%'
    },
    loading: {
        height: 272
    }
})