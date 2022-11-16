import React, { useState } from 'react'
import { View, Modal, StyleSheet, Animated } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { CompassBack, CompassDash } from '../../../assets/compass'
import { basic1000, danger, primary, basic200 } from '../../../styles/GlobalStyle'

const NavigationWidgetModal = (props) => {
    const [size, setSize] = useState(null)

    const sizeHandler = React.useCallback((event) => {
        const base = (event.nativeEvent.layout.width / 48) * 0.9

        setSize({
            dash: {
                width: base,
                height: base * 2,
                top: base * 10.25,
                radius: base * 14
            },
            compass: {
                width: 48 * base,
                height: 48 * base,
            },
            icon: {
                width: 6 * base,
                height: 6 * base
            },
            text: {
                top: 13 * base
            },
            arrow: {
                width: 10 * base,
                height: 10 * base
            }
        })
    })

    return <Modal
        onRequestClose={props.hideModal}
        visible={props.visible}>
        <View onLayout={sizeHandler} style={styles.mainView}>
            {size !== null ?
                <>
                    <View style={{ alignSelf: 'center', top: (size.compass.width / 2) + 40 }}>
                        <Icon name='navigation' style={{ width: size.arrow.width, height: size.arrow.height }} fill={primary} />
                    </View>
                    <Animated.View style={{ width: size.compass.width, backgroundColor: 'rgba(0,0,0,0)', height: size.compass.height, alignSelf: 'center', transform: [{ rotate: props.rotation }] }} >
                        <CompassBack style={styles.compass} fill={basic1000} northFill={danger} />
                        <Text status='danger' style={{ position: 'absolute', alignSelf: 'center', top: size.text.top, fontSize: 20, fontWeight: 'bold' }}>N</Text>
                        <Animated.View style={{ ...styles.dashPosition, top: size.dash.top, height: size.dash.radius * 2, transform: [{ rotate: props.heading }] }}>
                            <CompassDash style={{ ...styles.dash, width: size.dash.width, height: size.dash.height }} fill={primary} />
                            <Icon style={{ width: size.icon.width, height: size.icon.height, position: 'absolute', alignSelf: 'center', bottom: 50 }} fill={primary} pack='cp' name='TS-filled' />
                        </Animated.View>
                    </Animated.View>
                </>
                : null}
        </View>
    </Modal >
}

export default NavigationWidgetModal

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: basic200
    },
    compass: {
        flex: 1,

    },
    dash: {
    },
    dashPosition: {
        position: 'absolute',
        alignSelf: 'center',
    },
    navigation: {
        width: 80,
        height: 80,
    }
})