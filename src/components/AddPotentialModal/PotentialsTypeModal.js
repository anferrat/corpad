import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import Header from '../Header'
import PoitentialListItem from './components/PoitentialListItem'
import { basic } from '../../styles/colors'

const PotentialTypesModal = ({ potentialTypes, itemList, onSelect, dismiss }) => {
    const displayList = potentialTypes.map((pt, i) => ({ index: i, potentialType: pt })).filter((_, i) => itemList.map(item => item.potentialTypes).flat().indexOf(i) !== -1)
    //const potentailTypesDisplayList = itemList.map(item => item.potentialTypes).flat()
    //const displayList = potentailTypesDisplayList.filter((c, i) => potentailTypesDisplayList.indexOf(c) === i)

    const genTitleOptions = React.useCallback(() =>
        displayList.map((t) =>
            <PoitentialListItem
                icon={'grid'}
                key={`PotentialType-${t.potentialType.id}`}
                title={t.potentialType.name}
                onPress={onSelect.bind(this, t.index)} />
        ), [displayList, potentialTypes])

    return (
        <>
            <Header
                title='Select potential type'
                onBackPress={dismiss} />
            <ScrollView style={styles.mainView}>
                {genTitleOptions()}
                <View style={styles.hint}>
                    <Icon name='info-outline' fill={basic} style={styles.hintIcon} />
                    <Text category='s2' appearance='hint'>Create custom potentials types in Settings {`->`} Potentials</Text>
                </View>
            </ScrollView>
        </>
    )
}

export default React.memo(PotentialTypesModal)


const styles = StyleSheet.create({
    mainView: {
        padding: 12
    },
    hint: {
        paddingTop: 6,
        flexDirection: 'row',
        alignItems: 'center'
    },
    hintIcon: {
        width: 20,
        height: 20,
        marginRight: 12
    }
})
