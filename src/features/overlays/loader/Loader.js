import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '@ui-kitten/components'
import { primary } from '../../../styles/colors'
import LoaderProgressBar from './LoaderProgressBar'
import WaveActivityIndicator from '../../../components/WaveActivityIndicator'
import useLoader from './hooks/useLoader'

const Loader = () => {
    const { displayedText,
        loaderTitle,
        loaderVisible,
        isProgressVisible,
        total,
        count } = useLoader()

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
                        <WaveActivityIndicator
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
        maxWidth: 600,
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
    }
})