import React from 'react'
import { View, StyleSheet } from 'react-native'
import StatusView from '../StatusView'
import Select from '../Select'
import LocationView from '../LocationView'
import CreateSubitemButton from '../CreateSubitemButton'
import Input from '../Input'
import { globalStyle } from '../../../../../styles/styles'
import { TestPointTypes } from '../../../../../constants/global'
import { TestPointTypeLabels } from '../../../../../constants/labels'
import { TestPointTypeIcons } from '../../../../../constants/icons'
import PhotoView from '../photos/PhotoView'
import { translateEdit } from '../../../../../localization'

const TestPointView = ({ data, createSubitem, itemType, update, validate, updateLatAndLon, isPro }) => {
    const { id, name, status, testPointType, latitude, longitude, location, comment, defaultName, valid, imageUris } = data
    const testPointTypes = React.useMemo(() => Object.values(TestPointTypes).map(type => ({ item: TestPointTypeLabels[type], index: type })), [])
    const testPointAccessoryList = React.useMemo(() => testPointTypes.map(({ index }) => ({ icon: TestPointTypeIcons[index], pack: 'cp' })), [testPointTypes])
    return (
        <>
            <StatusView
                update={update}
                status={status} />

            <View style={globalStyle.card}>
                <Input
                    update={update}
                    validate={validate}
                    maxLength={40}
                    value={name}
                    valid={valid.name}
                    property='name'
                    placeholder={defaultName} />
                <Select
                    style={styles.select}
                    update={update}
                    accessoryList={testPointAccessoryList}
                    property='testPointType'
                    itemList={testPointTypes}
                    selectedIndex={testPointType}
                    />
                <LocationView
                    updateLatAndLon={updateLatAndLon}
                    update={update}
                    validate={validate}
                    latitude={latitude}
                    longitude={longitude}
                    latitudeValid={valid.latitude}
                    longitudeValid={valid.longitude} />
                <Input
                    update={update}
                    validate={validate}
                    maxLength={80}
                    valid={valid.location}
                    value={location}
                    property='location'
                    />
                <Input
                    update={update}
                    validate={validate}
                    maxLength={300}
                    multiline={true}
                    valid={valid.comment}
                    textAlignVertical={'top'}
                    numberOfLines={3}
                    value={comment}
                    property='comment'
                    />
                {isPro ?
                    <PhotoView
                        itemId={id}
                        itemType={itemType}
                        imageUris={imageUris} />
                    : null}
                <View style={styles.button}>
                    <CreateSubitemButton
                        title={translateEdit('addReading')}
                        onSelect={createSubitem}
                        itemType={itemType} />
                </View>
            </View>

        </>
    )
}

export default React.memo(TestPointView)

const styles = StyleSheet.create({
    button: {
        marginHorizontal: -12,
        marginBottom: -12
    },
    select: {
        paddingBottom: 12
    }
})
