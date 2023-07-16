import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { globalStyle } from '../../../styles/styles'
import BottomButton from '../../../components/BottomButton'
import LoadingView from '../../../components/LoadingView'
import useExportSubitems from './hooks/useExportSubitems'
import SubitemPropertySelector from './components/subitem/SubitemPropertySelector'

const SubitemProperties = ({ navigateToExportOverview }) => {
    const {
        loading,
        toggleSubitemProperty,
        subitemProperties,
        subitems,
        onNextPress
    } = useExportSubitems(navigateToExportOverview)
    return (
        <>
            <ScrollView
                contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    <LoadingView loading={loading}>
                        {subitems.map(({ type, properties }) => (
                            <SubitemPropertySelector
                                key={type}
                                selected={subitemProperties}
                                properties={properties}
                                subitemType={type}
                                toggleSubitemProperty={toggleSubitemProperty}
                            />
                        ))}
                    </LoadingView>
                </View>
            </ScrollView>
            <BottomButton
                iconPosition={'right'}
                icon={'arrow-circle-right'}
                onPress={onNextPress}
                title={'Next'} />
        </>
    )
}

export default SubitemProperties

const styles = StyleSheet.create({
    container: StyleSheet.compose(globalStyle.card, {
        minHeight: 80,
        justifyContent: 'center'
    }),
    scrollView: {
        paddingBottom: 72
    }
})