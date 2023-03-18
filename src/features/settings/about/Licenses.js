import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { Text } from '@ui-kitten/components'
import { StyleSheet, View } from 'react-native'
import { default as licenseList } from '../../../licenses/android/licenses.json'

const Licenses = () => {
    const renderItem = ({ item }) => {
        return (
            <Text category='s1' style={styles.listItem}>- {item}, <Text category='s1'>{licenseList[item].copyright}</Text></Text>
        )
    }
    return (
        <FlatList
            contentContainerStyle={styles.mainView}
            ListFooterComponent={<Text>{`\nThe MIT License (MIT)\n\nCopyright (c) <year> <copyright holders>\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`}</Text>}
            data={Object.keys(licenseList)}
            renderItem={renderItem}
            ListHeaderComponent={<>
                <Text style={styles.header}>The following components are licensed under the MIT licence reproduced below:</Text>
            </>}
        />

    )
}

export default Licenses

const styles = StyleSheet.create({
    mainView: {
        padding: 12
    },
    header: {
        paddingBottom: 12,
        paddingTop: 12
    },
    listItem: {
        paddingBottom: 6,
        fontWeight: 'bold'
    }
})