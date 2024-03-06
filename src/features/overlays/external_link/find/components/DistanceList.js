import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from '@ui-kitten/components'
import ListItem from './ListItem'
import Title from './Title'
import EmptyMatchView from './EmptyMatchView'
import { activity, search } from '../../../../../components/Icons'

const DistanceList = ({ searchedByDistance, distanceMatches, searchByDistance, distanceSearchAvailable, navigateToView, distanceLoading }) => {
    if (distanceSearchAvailable)
        return (
            <>
                <Title
                    title={'Items in close proximity'} />
                <View style={styles.container}>
                    {!searchedByDistance ?
                        <Button
                            disabled={distanceLoading}
                            onPress={searchByDistance}
                            accessoryLeft={distanceLoading ? activity : search}
                            appearance='ghost'>
                            Search by location
                        </Button> : (
                            distanceMatches.length === 0 ? <EmptyMatchView /> :
                                distanceMatches.map(({ item, distance }) =>
                                    <ListItem
                                        key={item.id}
                                        id={item.id}
                                        name={item.name}
                                        testPointType={item.testPointType}
                                        status={null}
                                        navigateToView={navigateToView}
                                        value={distance}
                                        itemType={item.itemType}
                                    />)
                        )}
                </View>
            </>
        )
    else return null
}

export default DistanceList

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
    },
})