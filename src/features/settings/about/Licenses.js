import React from 'react'
import { SectionList } from 'react-native'
import { Text } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import { default as licenses } from '../../../licenses/android/licenses.json'
import { licenseSplitter } from './helpers/functions'
import { licenseText } from './helpers/licenseText'
import { translateSettings } from '../../../localization'


const Licenses = () => {
    const renderItem = ({ item }) => {
        const { copyright, name } = item
        return (
            <Text
                category='s1'
                style={styles.listItem}>- {name}, <Text category='s1'>{copyright}</Text></Text>
        )
    }
    const renderSectionHeader = ({ section: { title } }) => (
        <View style={styles.sectionHeader}>
            <Text
                style={styles.sectionTitle}
                category='h6'>
                {title}
            </Text>
            <Text category='p1'>
                 {translateSettings('licenseDescription', {title})}
            </Text>
        </View>
    )

    const renderSectionFooter = ({ section: { title } }) => (
        <View>
            <Text category='p1'>
                {licenseText[title]}
            </Text>
        </View>
    )

    const renderListHeader = () => (
        <View>
            <Text
                category='h5'
                style={styles.header}>
                 {translateSettings('thirdPartyNotices')}
            </Text>
            <Text category='p1' style={styles.headerText}>
                 {translateSettings('licenseListDescription')}
            </Text>
        </View>
    )
    return (
        <SectionList
            keyExtractor={item => item.name}
            contentContainerStyle={styles.mainView}
            sections={licenseSplitter(licenses)}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            renderSectionFooter={renderSectionFooter}
            ListHeaderComponent={renderListHeader}
            stickySectionHeadersEnabled={false}
        />
    )
}

export default Licenses

const styles = StyleSheet.create({
    mainView: {
        padding: 12
    },
    sectionHeader: {
        paddingBottom: 12,
        paddingTop: 12
    },
    listItem: {
        paddingBottom: 6,
        fontWeight: 'bold'
    },
    sectionTitle: {
        paddingBottom: 12,
    },
    header: {
        paddingBottom: 24,
        textAlign: 'center'
    },
    headerText: {
        textAlign: 'center'
    }
})
