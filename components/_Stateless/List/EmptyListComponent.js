import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { basic } from '../../../styles/GlobalStyle'

const EmptyListComponent = (props) => {
    return (
        <View
            style={props.visible ? styles.main : styles.hidden}>
            <Icon style={styles.icon} name='clipboard' fill={basic} />
            <Text category='h3' appearance='hint' style={styles.mainText}>No Items</Text>
            <Text category='p1' appearance='hint' style={props.filtered ? styles.hidden : styles.text}>To add new item press <Icon name='plus-square' style={styles.iconText} fill={basic} /> and select type</Text>
            <Text category='p1' appearance='hint' style={!props.filtered ? styles.hidden : styles.text}>Seems like you filtered all the results. Select <Icon name='funnel' style={styles.iconText} fill={basic} /> and clear filters</Text>
        </View>
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
    hidden: {
        display: 'none',
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