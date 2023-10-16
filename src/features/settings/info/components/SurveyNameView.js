import React, { useRef, useEffect, useCallback, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, } from '@ui-kitten/components'
import SurveyNameModal from './SurveyNameModal'


const SurveyNameView = ({ name, inputText, updateSurveyName, resetNameInput, onChangeNameInput }) => {
    const inputRef = useRef()
    const [visible, setVisible] = useState(false)

    const showModal = useCallback(() => setVisible(true), [])

    const updateHandler = () => {
        updateSurveyName()
        setVisible(false)
    }

    const hideModal = useCallback(() => {
        setVisible(false)
        resetNameInput()
    }, [])
    return (
        <View style={styles.surveyTitle}>
            <View style={styles.titleView}>
                <Text
                    appearance='hint'
                    category='label'>Survey name</Text>
                <Text
                    category='h5'
                    ellipsizeMode='tail'
                    numberOfLines={1}
                    style={styles.title}>{name}</Text>
            </View>
            <SurveyNameModal
                showModal={showModal}
                updateHandler={updateHandler}
                hideModal={hideModal}
                visible={visible}
                inputRef={inputRef}
                inputText={inputText}
                onChangeNameInput={onChangeNameInput} />
        </View>
    )
}

export default React.memo(SurveyNameView)

const styles = StyleSheet.create({
    surveyTitle: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingLeft: 6,
        paddingBottom: 24,
    },
    title: {
        flex: 1,
        marginRight: 24,
        marginLeft: 12,
    },
    titleView: {
        flex: 1
    },
    modal: {
        width: '90%'
    },
    backDrop: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    inputView: {
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 6,
        flex: 1,
    },
    input: {
        flex: 1
    },
    button: {
        flex: 1
    }
})