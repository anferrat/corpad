import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from '@ui-kitten/components'
import SingleIconButton from '../../../../components/IconButton'

const SheetHeader = (props) => (
    <View style={styles.titleRow}>
        <View style={styles.titleView}>
            {props.backActionHandler ? <SingleIconButton
                onPress={props.backActionHandler}
                iconName={'arrow-back-outline'} /> : null}
            <Text category='h4'
                numberOfLines={1}
                ellipsizeMode='tail'
                style={styles.titleText}>
                {props.title}
            </Text>
        </View>
        <Button
            style={styles.button}
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
        flex: 1
    },
    titleText: {
        fontWeight: 'bold',
        padding: 12,
    },
    titleRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        flexBasis: 90,
        marginLeft: 8
    }
})