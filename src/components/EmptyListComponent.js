import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import { basic, basic200 } from '../styles/colors'


const EmptyListComponent = (props) => {
    return (
        <View style={styles.mainView}>
            <Icon style={styles.icon} fill={basic} name={props.icon} pack={props.pack} />
            <Text category='h3' appearance={'hint'} style={styles.title}>{props.title}</Text>
            <Text category='p1' appearance={'hint'} style={styles.title}>{props.description}</Text>
        </View>
    )
}

export default React.memo(EmptyListComponent)

const styles = StyleSheet.create({
    mainView: {
        ...StyleSheet.absoluteFill,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: basic200,
        padding: 36
    },
    title: {
        marginBottom: 20,
        marginTop: 10,
        textAlign: 'center'
    },
    icon: {
        width: 80,
        height: 80,
    }
})