import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { basic } from '../../../../styles/colors'
import { translateList } from '../../../../localization'

const EmptyListComponent = (props) => {
    if (props.visible)
        return (
            <View
                style={styles.main}>
                <Icon style={styles.icon} name='list-outline' fill={basic} />
                <Text category='h3' appearance='hint' style={styles.mainText}>{translateList('noItems')}</Text>
                {props.filtered ? <FilteredItemsHint /> : <EmptyListHint />}
            </View>
        )
    else return null
}

const FilteredItemsHint = () => {
    return (
        <Text category='p1' appearance='hint' style={styles.text}>
            {translateList('filteredHint')}
        </Text>
    )
}

const EmptyListHint = () => {
    return (
        <Text category='p1' appearance='hint' style={styles.text}>
            {translateList('addItemHint')}
        </Text>
    )
}

export default EmptyListComponent

const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '80%',
        padding: 12
    },
    icon: {
        width: 60,
        height: 60
    },
    iconText: {
        width: 20,
        height: 20,
        marginHorizontal: 3
    },
    text: {
        textAlign: 'center'
    },
    mainText: {
        paddingBottom: 12
    }
})
