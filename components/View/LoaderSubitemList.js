import React, { useState, useRef, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/core'
import { sendRequest } from '../../database/db'
import CardView from './Card/CardView'
import CircuitView from './Circuit/CircuitView'
import { errorHandler } from '../errorHandler'
import { androidStyle, primary } from '../../styles/GlobalStyle'
import { ActivityIndicator, View } from 'react-native'
import { potentialUnits } from '../../constants/constants'

const fetchData = async (dataTypeItem, itemId) => {
    switch (dataTypeItem) {
        case 'TEST_POINT':
            {
                const cardList = (await sendRequest('SELECT', 'CARD_LIST', { testPointId: itemId })).result
                const pipelineList = (await sendRequest('SELECT', 'PIPELINE_LIST_DATA', {})).result
                const referenceCellList = (await sendRequest('SELECT', 'REFERENCE_CELL_LIST', { testPointId: itemId })).result
                const potentialsList = (await Promise.all(cardList.map(async card => await sendRequest('SELECT', 'POTENTIALS', { cardId: card.id })))).map(p => p.result)
                const sides = (await Promise.all(cardList.map(async card => await sendRequest('SELECT', 'SIDES', { cardId: card.id })))).map(p => p.result)
                const dataArray = (await Promise.all(cardList.map(async card => await sendRequest('SELECT', 'CARD', { cardId: card.id, cardType: card.type })))).map(p => p.result)
                const defaultPotentialUnit = (await sendRequest('SELECT', 'SETTINGS'))?.result?.defaultPotentialUnit ?? 0
                return {
                    data: cardList.map((_, index) => (
                        {
                            ...dataArray[index],
                            potentials: potentialsList[index],
                            sideA: sides[index].filter(s => s.sideAId !== null).map(s => s.sideAId),
                            sideB: sides[index].filter(s => s.sideBId !== null).map(s => s.sideBId),
                        })),
                    pipelineList: pipelineList,
                    referenceCellList: referenceCellList,
                    cardList: cardList,
                    defaultPotentialUnit: potentialUnits[defaultPotentialUnit]
                }
            }
        case 'RECTIFIER':
            return ({ data: (await sendRequest('SELECT', 'CIRCUITS', { rectifierId: itemId })).result })
        case 'PIPELINE':
            return ({ data: [] })
    }
}


const LoaderSubitemList = (props) => {
    const [data, setData] = useState({ data: [] })
    const [isLoading, setIsLoading] = useState(false)
    const componentMounted = useRef(true)

    useFocusEffect(React.useCallback(() => {
        const getDataFromDB = async (itemId) => {
            setIsLoading(true)
            try {
                const dataObject = await fetchData(props.dataTypeItem, itemId)
                if (componentMounted.current) {
                    setData(dataObject)
                    setIsLoading(false)
                }
            }
            catch (er) {
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
        return <View style={androidStyle.EmptyCardList}><ActivityIndicator color={primary} size='large' /></View>
    else
        return (
            <>
                {[...data?.data].reverse().map((subitemData, index) => {
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