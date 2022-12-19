import React, { useState, useRef, useEffect } from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/core'
import { sendCombinedRequest, sendRequest } from '../../api/database/index'
import CardView from './card/CardView'
import CircuitView from './circuit/CircuitView'
import { errorHandler } from '../../helpers/error_handler'
import { primary } from '../../styles/colors'
import { potentialUnits } from '../../constants/constants'

const fetchData = async (dataTypeItem, itemId) => {
    switch (dataTypeItem) {
        case 'TEST_POINT':
            {
                const request = await sendCombinedRequest([
                    ['SELECT', 'CARD_LIST', { testPointId: itemId }],
                    ['SELECT', 'PIPELINE_LIST_DATA', {}],
                    ['SELECT', 'REFERENCE_CELL_LIST', { testPointId: itemId }],
                    ['SELECT', 'SETTINGS', {}]
                ])
                if (request.status === 200) {
                    const extraData = await sendCombinedRequest(request.result[0].map(card => ([
                        ['SELECT', 'POTENTIALS', { cardId: card.id }],
                        ['SELECT', 'SIDES', { cardId: card.id }],
                        ['SELECT', 'CARD', { cardId: card.id, cardType: card.type }]
                    ])).flat(1))
                    if (extraData.status === 200) {
                        return ({
                            status: 200,
                            result: {
                                data: request.result[0].map((_, index) => {
                                    return ({
                                        ...extraData.result[(index * 3) + 2],
                                        potentials: extraData.result[index * 3],
                                        sideA: extraData.result[(index * 3) + 1].filter(s => s.sideAId !== null).map(s => s.sideAId),
                                        sideB: extraData.result[(index * 3) + 1].filter(s => s.sideBId !== null).map(s => s.sideBId),
                                    })
                                }),
                                pipelineList: request.result[1],
                                referenceCellList: request.result[2],
                                cardList: request.result[0],
                                defaultPotentialUnit: potentialUnits[request.result[3]?.defaultPotentialUnit ?? 0]
                            }
                        })

                    }
                    else return extraData
                }
                else return request
            }
        case 'RECTIFIER':
            const circuits = await sendRequest('SELECT', 'CIRCUITS', { rectifierId: itemId })
            if (circuits.status === 200)
                return {
                    status: 200,
                    result: {
                        data: circuits.result
                    }
                }
            else return circuits
        case 'PIPELINE':
            return ({
                status: 200,
                result: {
                    data: []
                }
            })
    }
}


const LoaderSubitemList = (props) => {
    const [data, setData] = useState({ data: [] })
    const [isLoading, setIsLoading] = useState(false)
    const componentMounted = useRef(true)

    useFocusEffect(React.useCallback(() => {
        const getDataFromDB = async (itemId) => {
            setIsLoading(true)
            const dataObject = await fetchData(props.dataTypeItem, itemId)
            if (dataObject.status === 200) {
                if (componentMounted.current) {
                    setData(dataObject.result)
                    setIsLoading(false)
                }
            }
            else {
                errorHandler(602)
            }
        }
        getDataFromDB(props.itemId)
    }, [setData, setIsLoading]))

    useEffect(() => {
        componentMounted.current = true
        return () => componentMounted.current = false
    }, [])

    if (isLoading)
        return <View style={styles.empty}><ActivityIndicator color={primary} size='large' /></View>
    else
        return (
            <>
                {[...data?.data].reverse().map((subitemData) => {
                    switch (props.dataTypeItem) {
                        case 'TEST_POINT':
                            return <CardView
                                cardData={subitemData}
                                cardList={data.cardList}
                                referenceCellList={data.referenceCellList}
                                pipelineList={data.pipelineList}
                                itemId={props.itemId}
                                defaultPotentialUnit={data.defaultPotentialUnit}
                                key={subitemData.uid}
                                navigateToEditSubitem={props.navigateToEditSubitem.bind(this, subitemData.id, false, subitemData.type)} />
                        case 'RECTIFIER':
                            return <CircuitView
                                circuitData={subitemData}
                                itemId={props.itemId}
                                key={subitemData.uid}
                                navigateToEditSubitem={props.navigateToEditSubitem.bind(this, subitemData.id, false, 'CT')} />
                        case 'PIPELINE':
                            return null
                    }
                })}
            </>
        )
}
export default LoaderSubitemList

const styles = StyleSheet.create({
    empty: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 350
    }
})