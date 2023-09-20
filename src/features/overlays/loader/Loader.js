import React from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import { Text } from '@ui-kitten/components'
import { useSelector } from 'react-redux'
import { primary } from '../../../styles/colors'
import LoaderProgressBar from './LoaderProgressBar'

const Loader = () => {
    const text = useSelector(state => state.settings.loader.text)
    const loaderVisible = useSelector(state => state.settings.loader.visible)
    const loaderTitle = useSelector(state => state.settings.loader.title)
    const progress = useSelector(state => state.settings.loader.progress)
    const { visible, title, count, total } = progress
    const isProgressVisible = visible && total && count <= total
    const displayedText = isProgressVisible ? `${title} (${count}/${total})` : text
    if (loaderVisible)
        return (
            <View
                style={styles.mainView}>
                <View
                    style={styles.infoView}>
                    <Text
                        style={styles.bold}
                        category={'h6'}>
                        {loaderTitle}
                    </Text>
                    {displayedText ?
                        <Text
                            category='p1'
                            style={styles.text}>
                            {displayedText}
                        </Text> : null}
                    {isProgressVisible ?
                        <LoaderProgressBar
                            total={total}
                            count={count}
                        /> :
                        <ActivityIndicator
                            size='large'
                            color={primary} />
                    }
                </View>
            </View>
        )
    else return null
}

export default Loader

const styles = StyleSheet.create({
    mainView: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoView: {
        borderRadius: 12,
        backgroundColor: '#fff',
        width: '80%',
        maxWidth: 500,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12
    },
    bold: {
        fontWeight: 'bold',
        paddingVertical: 12
    },
    text: {
        paddingBottom: 12,
        textAlign: 'center'
    },
    hidden: {
        display: 'none'
    }
})