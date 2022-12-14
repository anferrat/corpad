import React from 'react'
import { View, StyleSheet } from 'react-native'
import TopBarTitle from './ItemTitle'
import { labels } from '../../../../constants/constants'
import { basic300 } from '../../../../styles/colors'

const DefaultNameExample = (props) => {
    const defaultName = props.defaultName === null ? '' : props.defaultName
    return (
        <View style={styles.mainView}>
            <TopBarTitle
                cp
                large
                iconName={labels[props.selectedType].icon}
                title={props.displayPipelineName ? '<MyPipeline>' : `${defaultName}1`}
                subtitle={labels[props.selectedType].label} />
        </View>
    )
}

export default React.memo(DefaultNameExample)

const styles = StyleSheet.create({
    mainView: {
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