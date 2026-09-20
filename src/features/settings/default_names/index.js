import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { globalStyle } from '../../../styles/styles'
import { basic300 } from '../../../styles/colors'
import LoadingView from '../../../components/LoadingView'
import useDefaultNames from './hooks/useDefaultNames'
import Input from '../../../components/Input'
import CheckBox from './components/CheckBox'
import NamePreview from './components/NamePreview'
import Hint from '../../../components/Hint'
import BottomButton from '../../../components/BottomButton'
import Select from '../../../components/Select'
import { translateSettings } from '../../../localization'

export const DefaultNames = () => {
    const { defaultNames, loading, selectedType, value, valid, pipelineNameAsDefault, pipelineNameSettingActive, itemList, selectedIndex, accessoryList, onChangeText, onEndEditing, onChangeType, updateNames, onChangePipelineNameSetting } = useDefaultNames()
    return (
        <LoadingView loading={loading}>
            <ScrollView
                contentContainerStyle={styles.mainView}>
                <View style={globalStyle.card}>
                    <Select
                        label={translateSettings('category')}
                        itemList={itemList}
                        accessoryList={accessoryList}
                        onSelect={onChangeType}
                        selectedIndex={selectedIndex} />
                    <Input
                        maxLength={30}
                        style={styles.input}
                        value={value}
                        valid={valid}
                        label={translateSettings('defaultNamePrefix')}
                        onChangeText={onChangeText}
                        onEndEditing={onEndEditing}
                        unit={'<index>'}
                        disabled={pipelineNameAsDefault && pipelineNameSettingActive} />
                    <CheckBox
                        pipelineNameAsDefault={pipelineNameAsDefault}
                        pipelineNameSettingActive={pipelineNameSettingActive}
                        onChangePipelineNameSetting={onChangePipelineNameSetting} />
                    <NamePreview
                        name={defaultNames[selectedType]}
                        type={selectedType}
                        pipelineNameAsDefault={pipelineNameAsDefault}
                        pipelineNameSettingActive={pipelineNameSettingActive} />
                    <Hint>
                         {translateSettings('defaultNamesHint')}
                    </Hint>
                </View>
            </ScrollView>
            <BottomButton
                icon={'save'}
                onPress={updateNames}
                 title={translateSettings('save')} />
        </LoadingView>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    emptyView: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkBox: {
        paddingVertical: 12,
    },
    input: {
        paddingTop: 12
    },
    textIcon: {
        width: 15,
        height: 15,
        marginRight: 6
    },
    example: {
        flex: 1,
        marginTop: 32,
        padding: 12,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: basic300,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24
    }
})
