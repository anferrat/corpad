import React from 'react'
import InputField from '../InputField'
import { View } from 'react-native'
import { referenceCellCodes } from '../../../constants/constants'
import { unitConverter } from '../../../helpers/functions'

const PotentialsView = (props) => {
    if (props.potentials?.length !== 0) {
        const potentials = props.potentials?.map(data => {
            return {
                id: data.id,
                uid: data.uid,
                name: data.name,
                value: unitConverter(data.value, 'V', props.unit),
                unit: props.unit,
                referenceCellId: data.portableReferenceId !== null ? data.portableReferenceId : data.permanentReferenceId,
                isPortable: data.portableReferenceId !== null
            }
        })

        return (
            <View>
                {potentials?.map(item =>
                    <InputField
                        dataTypeItem='TEST_POINT'
                        keyboardType='numeric'
                        itemId={props.itemId}
                        displayHint={props.referenceCellList.length > 1}
                        hintTitle={props.referenceCellList.find(rc => (rc.id === item.referenceCellId) && (rc.isPortable == item.isPortable))?.name}
                        hintIcon='RE'
                        key={'PotentialValue - ' + item.uid}
                        value={item.value}
                        title={item.name}
                        potentialId={item.id}
                        property='potential'
                        unit={{
                            main: item.unit,
                            script: referenceCellCodes[props.referenceCellList.find(rc => (rc.id === item.referenceCellId) && (rc.isPortable == item.isPortable))?.rcType]
                        }}
                    />)}
            </View>
        )
    }
    else return null
}

export default PotentialsView