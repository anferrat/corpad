import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from '@ui-kitten/components'
import IconButton from '../../../components/IconButton'
import { translateBottomSheet } from '../../../localization'

const SheetHeader = ({ onBackPress, onClosePress, title }) => (
    <View style={styles.titleRow}>
        <View style={styles.titleView}>
            {onBackPress ?
                <IconButton
                    onPress={onBackPress}
                    iconName={'arrow-back-outline'} />
                : null}
            <Text
                category='h4'
                numberOfLines={1}
                ellipsizeMode='tail'
                style={styles.titleText}>
                {title}
            </Text>
        </View>
        <Button
            style={styles.button}
            appearance='ghost'
            onPress={onClosePress}>
            {translateBottomSheet('close')}
        </Button>
    </View>
)

export default React.memo(SheetHeader)

const styles = StyleSheet.create({
    titleView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        height: 80,
        flex: 1,
    },
    titleText: {
        fontWeight: 'bold',
        paddingHorizontal: 12,
    },
    titleRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        flexBasis: 90,
        marginLeft: 8
    }
})
