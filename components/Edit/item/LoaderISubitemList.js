import React, { useState, useRef, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/core'
import { sendRequest } from '../../../database/db'
import { labels } from '../../../constants/constants'
import { genRequestObject } from '../../customFunctions'
import SubitemListItem from '../../_Stateless/SubitemListItem'
import { errorHandler } from '../../errorHandler'

const LoaderSubitemList = (props) => {
    const [subitems, setSubitems] = useState([])
    const componentMounted = useRef(true) //prevents updating state for unmounted component

    useFocusEffect(
        React.useCallback(() => {
            const fetchDB = async () => {
                if (props.dataTypeSubitem !== null) {
                    const list = await sendRequest('SELECT', props.dataTypeSubitem + '_LIST', genRequestObject(props.dataType, props.itemId))
                    if (list.status === 200) {
                        if ((list.result?.length !== subitems.length || !list.result?.every((sub, i) => sub.name === subitems[i].name)) && componentMounted.current)
                            setSubitems(list.result)
                    }
                    else {
                        errorHandler(602, props.goBack)
                    }
                }

            }
            fetchDB()
        }, [subitems])
    )

    useEffect(() => () => componentMounted.current = false, [])

    const renderCards = React.useCallback((subitem) => {
        return <SubitemListItem
            key={'Subitem-' + subitem.uid}
            iconName={subitem.type}
            title={subitem.name}
            subtitle={labels[subitem.type].label}
            onPress={props.navigateToSubitem.bind(this, subitem.id, false, subitem.type)} />
    }, [props.navigateToSubitem])

    if (subitems?.length)
        return (
            <>
                {[...subitems].reverse().map(renderCards)}
            </>
        )
    else return null
}

export default LoaderSubitemList