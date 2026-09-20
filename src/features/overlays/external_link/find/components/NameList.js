import React from 'react'
import { View, StyleSheet } from 'react-native'
import ListItem from './ListItem'
import EmptyMatchView from './EmptyMatchView'
import Title from './Title'
import { translateOverlay } from '../../../../../localization'


const NameList = ({ items, navigateToView }) => {
    return (
        <>
            <Title
                hint={translateOverlay('externalLink.similarNameHint')}
                title={translateOverlay('externalLink.similarName')} />
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
