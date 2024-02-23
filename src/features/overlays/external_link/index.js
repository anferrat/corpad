import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useExternalLink } from './hooks/useExternalLink'
import { ItemView } from '../../../components/ItemView'

export const ExternalLinkView = ({ link }) => {
    const { item, pipelines, potentialTypes, referenceCells } = useExternalLink(link)
    if (item)
        return (
            <ScrollView style={styles.container}>
                <ItemView
                    item={item}
                    pipelines={pipelines}
                    potentialTypes={potentialTypes}
                    referenceCells={referenceCells}
                />
            </ScrollView>
        )
    else return null
}

const styles = StyleSheet.create({
    container: {
        flex: 0
    },
})