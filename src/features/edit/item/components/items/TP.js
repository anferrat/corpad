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

const testPointTypes = Object.values(TestPointTypes).map(type => ({ item: TestPointTypeLabels[type], index: type }))
const testPointAccessoryList = testPointTypes.map(({ index }) => ({ icon: TestPointTypeIcons[index], pack: 'cp' }))


const TestPointView = ({ data, createSubitem, itemType, update, validate, updateLatAndLon, isPro }) => {
    const { id, name, status, testPointType, latitude, longitude, location, comment, defaultName, valid, imageUris } = data
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
                    label='Name'
                    placeholder={defaultName} />
                <Select
                    style={styles.select}
                    update={update}
                    accessoryList={testPointAccessoryList}
                    property='testPointType'
                    itemList={testPointTypes}
                    selectedIndex={testPointType}
                    label='Test point type' />
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
                    label='Location'
                    value={location}
                    property='location'
                    placeholder='Location description' />
                <Input
                    update={update}
                    validate={validate}
                    maxLength={300}
                    multiline={true}
                    valid={valid.comment}
                    textAlignVertical={'top'}
                    numberOfLines={3}
                    label='Comments'
                    value={comment}
                    property='comment'
                    placeholder='Type your comments here' />
                {isPro ?
                    <PhotoView
                        itemId={id}
                        itemType={itemType}
                        imageUris={imageUris} />
                    : null}
                <View style={styles.button}>
                    <CreateSubitemButton
                        title={'Add reading'}
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

