import React, { useState } from 'react'
import { View, StyleSheet, } from 'react-native'
import ButtonSelector from '../../../components/ButtonSelector'
import ResultRow from './ResultRow'
import { translateCalculator } from '../../../localization'

const WennerResult = (props) => {
    const [averageDisplay, setAverageDisplay] = useState(0)
    const resultValues = averageDisplay === 0 ? props.result.average : props.result.layers
    return <View>
        {resultValues.length > 1 ?
            <View style={styles.buttonSelector}>
                <ButtonSelector
                    buttons={[{ title: translateCalculator('selectors.average') }, { title: translateCalculator('selectors.layers') }]}
                    selectedIndex={averageDisplay}
                    setSelected={setAverageDisplay}
                />
            </View> : null}
        {resultValues.map((r, i) => <ResultRow
            key={`(${r.a1} - ${r.a2} ${props.result.spacingUnit}) ${i}`}
            icon='layers-outline'
            title={translateCalculator('results.layer')}
            subtitle={`(${r.a1} - ${r.a2} ${props.result.spacingUnit})`}
            results={[
                { title: translateCalculator('inputs.resistance'), value: r.resistance, unit: props.result.resistanceUnit },
                { title: translateCalculator('results.resistivity'), value: r.resistivity, unit: props.result.resistivityUnit }
            ]}
        />)}
    </View>
}

export default WennerResult

const styles = StyleSheet.create({
    buttonSelector: {
        paddingBottom: 24
    }
})

//'\u00B5'
