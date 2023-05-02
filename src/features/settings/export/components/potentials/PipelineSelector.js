import React from 'react'
import { View, StyleSheet } from 'react-native'
import PipelineSelectorToken from './PipelineSelectorToken'


const PipelineSelector = ({ pipelines, pipelineIdList, togglePipeline }) => {
    return (
        <View style={styles.container}>
            {pipelines.map(({ name, id }) => (
                <PipelineSelectorToken
                    key={id}
                    title={name}
                    id={id}
                    selected={~pipelineIdList.indexOf(id)}
                    togglePipeline={togglePipeline}
                />
            ))}
        </View>
    )
}

export default PipelineSelector

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
})