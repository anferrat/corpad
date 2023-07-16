import React from 'react'
import { SectionList } from 'react-native'
import { Text } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import { default as licenses } from '../../../licenses/android/licenses.json'
import { licenseSplitter } from './helpers/functions'
import { licenseText } from './helpers/licenseText'


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
                The following components are licensed under the {title} licence reproduced below:
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
                Third Party Notices
            </Text>
            <Text category='p1' style={styles.headerText}>
                The following list third party software that may be contained in portion of this app:
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