import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import useFindItemInSurvey from './hooks/useFindItemInSurvey'
import { globalStyle } from '../../../../styles/styles'
import LoadingView from '../../../../components/LoadingView'
import NameList from './components/NameList'
import DistanceList from './components/DistanceList'
import UidMatchList from './components/UidMatchList'


const FindItemInSurvey = ({ uid, name, latitude, longitude, itemType, navigateToItem, goBack }) => {
    const {
        uidMatch,
        nameMatches,
        distanceMatches,
        searchedByDistance,
        loading,
        distanceLoading,
        searchByDistance,
        distanceSearchAvailable,
        navigateToView } =
        useFindItemInSurvey({ uid, name, latitude, longitude, itemType, navigateToItem, goBack })
    return (
        <ScrollView
            contentContainerStyle={styles.scrollView}>
            <View style={styles.container}>
                <LoadingView loading={loading}>
                    <UidMatchList
                        uidMatch={uidMatch}
                        navigateToView={navigateToView} />
                    <NameList
                        items={nameMatches}
                        navigateToView={navigateToView} />
                    <DistanceList
                        distanceLoading={distanceLoading}
                        searchByDistance={searchByDistance}
                        searchedByDistance={searchedByDistance}
                        distanceMatches={distanceMatches}
                        distanceSearchAvailable={distanceSearchAvailable}
                        navigateToView={navigateToView}
                    />

                </LoadingView>
            </View>
        </ScrollView>
    )
}

export default FindItemInSurvey

const styles = StyleSheet.create({
    container: {
        ...globalStyle.card_noPadding,
        flex: 1,
        minHeight: 200,
    },
    scrollView: {
    },
})