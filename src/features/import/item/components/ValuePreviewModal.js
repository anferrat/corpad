import React, { useState } from 'react'
import { Popover, Text } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import { getPreviewList, showItemValue } from '../helpers/functions'
import IconButton from '../../../../components/IconButton'
import FileBadge from './FileBadge'
import { basic200 } from '../../../../styles/colors'


const ValuePreviewModal = ({ data, fields, fieldIndex, fieldIndexList, importType }) => {
    const [visible, setVisible] = useState(false)
    const previewDataList = React.useMemo(() => getPreviewList(data, fields, fieldIndex, fieldIndexList, importType), [data, fields, fieldIndex, fieldIndexList, importType])
    const hideModal = React.useCallback(() => setVisible(false), [])
    const showModal = React.useCallback(() => setVisible(true), [])

    //workaround to pass ref, need to wrap inside View, some ui-kitten bs
    const renderAnchor = () => (
        <View>
            <FileBadge
                onPress={showModal}
            />
        </View>
    )

    return (
        <Popover
            style={styles.popover}
            visible={visible}
            placement='top end'
            anchor={renderAnchor}
            onBackdropPress={hideModal}>
            <View>
                <IconButton
                    size='small'
                    style={styles.closeButton}
                    iconName='close-outline'
                    onPress={hideModal} />
                {previewDataList.map((item, index) =>
                    <Text
                        style={styles.textLine}
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                        category='s2'
                        appearance='hint'
                        key={index}>
                        {showItemValue(item)}
                    </Text>)}
                {data.length > previewDataList.length ?
                    <Text
                        style={styles.textLine}
                    >...</Text> : null}
            </View>
        </Popover>
    )
}


export default ValuePreviewModal

const styles = StyleSheet.create({
    closeButton: {
        alignSelf: 'flex-end',
        marginRight: -12
    },
    textLine: {
        paddingVertical: 4
    },
    popover: {
        maxWidth: 130,
        minWidth: 70,
        paddingHorizontal: 12,
        paddingBottom: 12,
        backgroundColor: basic200
    }
})