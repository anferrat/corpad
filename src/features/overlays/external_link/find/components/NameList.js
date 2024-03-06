import React from 'react'
import { View, StyleSheet } from 'react-native'
import ListItem from './ListItem'
import EmptyMatchView from './EmptyMatchView'
import Title from './Title'


const NameList = ({ items, navigateToView }) => {
    return (
        <>
            <Title
                hint='Items in the opened survey that have similar name to the one from the opened link.'
                title={'Items with similar name'} />
            {
                items.length === 0 ? <EmptyMatchView /> :
                    <View
                        style={styles.container}>
                        {items.map(({ id, name, status, itemType, testPointType }) =>
                            <ListItem
                                itemType={itemType}
                                key={id}
                                id={id}
                                name={name}
                                testPointType={testPointType}
                                status={null}
                                navigateToView={navigateToView}
                            />)}
                    </View>
            }
        </>
    )

}

export default NameList

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
    },
})