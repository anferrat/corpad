import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Divider } from '@ui-kitten/components'
import IconLine from '../IconLine'
import TextLine from '../TextLine'
import ItemTitleView from '../ItemTitleView'
import { getFullDate } from '../../../../helpers/functions'
import { danger, success } from '../../../../styles/colors'
import { getCountTitle } from '../../helpers/functions'
import { PipelineMaterialLabels, PipelineProductLabels, PipeDiameterLabels, PipelineCoatingLabels } from '../../../../constants/labels'

const PL = ({ data, itemType }) => {
    const { name, timeModified, licenseNumber, tpCount, comment, material, nps, coating, product } = data

    const displayedTime = React.useMemo(() => getFullDate(timeModified), [timeModified])

    const displayedCount = getCountTitle(tpCount)

    return (
        <View>
            <View style={styles.titleView}>
                <ItemTitleView
                    itemType={itemType}
                    title={name} />
            </View>
            <IconLine icon='calendar-outline' value={displayedTime} />
            <IconLine icon='hash-outline' value={licenseNumber} />
            <IconLine icon='TSS' pack='cp' value={displayedCount} />
            <IconLine icon='message-square-outline' value={comment} />
            <Divider style={styles.divider} />
            <TextLine
                title='Material'
                value={PipelineMaterialLabels[material] ?? null}
                icon='cube-outline' />
            <TextLine
                title='Size'
                value={PipeDiameterLabels[nps] ?? null} />
            <TextLine
                title='Coating'
                value={PipelineCoatingLabels[Number(coating)]}
                icon={coating ? 'checkmark-outline' : 'slash-outline'}
                fill={coating ? success : danger} />
            <TextLine title='Product' value={PipelineProductLabels[product] ?? null} />
        </View>
    )
}
export default React.memo(PL)

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