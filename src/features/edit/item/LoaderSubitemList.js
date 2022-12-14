import React, { useState, useRef, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/core'
import { sendRequest } from '../../../api/database/index'
import { labels } from '../../../constants/constants'
import { genRequestObject } from '../../../helpers/functions'
import SubitemListItem from './components/SubitemListItem'
import { errorHandler } from '../../../helpers/error_handler'

const LoaderSubitemList = (props) => {
    const [subitems, setSubitems] = useState([])
    const componentMounted = useRef(true)

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