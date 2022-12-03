import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Divider } from '@ui-kitten/components'
import { pipeMaterials, pipeDiameterList, pipeProducts } from '../../../constants/constants'
import IconLine from '../components/IconLine'
import TextLine from '../components/TextLine'
import { getFullDate } from '../../../helpers/functions'
import TopBarTitle from '../../../components/ItemTitle'
import { danger, success } from '../../../styles/colors'

const getValue = (index, array) => {
    if (index === null || array[index] === undefined)
        return null
    else return array[index]
}

const getTestPointCount = (count) => {
    if (count !== undefined) {
        return `${count} test point${count !== 1 ? 's' : ''}`
    }
    else return null
}

const PipelineView = (props) => {
    return (
        <View style={styles.mainView}>
            <View style={styles.titleView}>
                <TopBarTitle
                    iconName='PL'
                    cp={true}
                    subtitle='Pipeline'
                    title={props.pipelineData.name}
                    large={true} />
            </View>
            <IconLine icon='calendar-outline' value={getFullDate(props.pipelineData.timeModified)} hideEmpty />
            <IconLine icon='hash-outline' value={props.pipelineData.licenseNumber} hideEmpty />
            <IconLine icon='TSS' pack='cp' value={getTestPointCount(props.pipelineData.tpCount)} hideEmpty />
            <IconLine icon='message-square-outline' value={props.pipelineData.comment} hideEmpty />
            <Divider style={styles.divider} />
            <TextLine title='Material' value={getValue(props.pipelineData.material, pipeMaterials)} icon={'cube-outline'} hideEmpty />
            <TextLine title='Size' value={getValue(props.pipelineData.nps, pipeDiameterList)} hideEmpty />
            <TextLine title='Coated' value={props.pipelineData.coating ? 'Yes' : 'No'} icon={props.pipelineData.coating ? 'checkmark-outline' : 'slash-outline'} fill={props.pipelineData.coating ? success : danger} />
            <TextLine title='Product' value={getValue(props.pipelineData.product, pipeProducts)} hideEmpty />
        </View>
    )
}
export default React.memo(PipelineView)

const styles = StyleSheet.create({
    divider: {
        marginVertical: 4
    },
    titleView: {
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})