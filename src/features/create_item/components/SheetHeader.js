import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from '@ui-kitten/components'
import SingleIconButton from '../../../components/IconButton'

const SheetHeader = (props) => (
    <View style={styles.titleRow}>
        <View style={styles.titleView}>
            {props.backActionHandler ? <SingleIconButton
                onPress={props.backActionHandler}
                iconName={'arrow-back-outline'} /> : null}
            <Text category='h5'
                style={styles.titleText}>
                {props.title}
            </Text>
        </View>
        <Button
            appearance='ghost'
            onPress={props.onCloseHandler}>
            Close</Button>
    </View>
)

export default React.memo(SheetHeader)

const styles = StyleSheet.create({
    titleView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    titleText: {
        fontWeight: 'bold',
        padding: 12
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})