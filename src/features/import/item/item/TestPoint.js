import React from 'react'
import { View, StyleSheet } from 'react-native'
import Parameter from '../Parameter'
import { globalStyle } from '../../../../styles/styles'
import AddSubitemButton from './AddSubitemButton'

const TestPointView = (props) => {
    return (
        <>
            <View style={globalStyle.card}>
                <View style={styles.mainView}>
                    <Parameter
                        data={props.data}
                        fields={props.fields}
                        navigateToParameters={props.navigateToParameters.bind(this, 'name', null)}
                        property='name' />
                    <Parameter
                        data={props.data}
                        fields={props.fields}
                        navigateToParameters={props.navigateToParameters.bind(this, 'status', null)}
                        property='status' />
                    <View style={styles.location}>
                        <Parameter
                            data={props.data}
                            fields={props.fields}
                            style={styles.locationField}
                            navigateToParameters={props.navigateToParameters.bind(this, 'latitude', null)}
                            property='latitude' />
                        <Parameter
                            data={props.data}
                            style={styles.locationField}
                            fields={props.fields}
                            navigateToParameters={props.navigateToParameters.bind(this, 'longitude', null)}
                            property='longitude' />
                    </View>
                    <Parameter
                        data={props.data}
                        fields={props.fields}
                        navigateToParameters={props.navigateToParameters.bind(this, 'location', null)}
                        property='location' />
                    <Parameter
                        data={props.data}
                        fields={props.fields}
                        navigateToParameters={props.navigateToParameters.bind(this, 'comment', null)}
                        property='comment' />
                </View>
                <View style={styles.button}>
                    <AddSubitemButton
                        itemType={'TEST_POINT'}
                    />
                </View>
            </View>
        </>
    )
}

export default TestPointView

const styles = StyleSheet.create({
    mainView: {
        padding: 12
    },
    icon: {
        width: 20,
        height: 20,
    },
    location: {
        flexDirection: 'row',
        marginHorizontal: -6,
    },
    locationField: {
        flex: 1,
        marginHorizontal: 6,
    },
    button: {
        marginHorizontal: -12,
        marginBottom: -12
    }
})

