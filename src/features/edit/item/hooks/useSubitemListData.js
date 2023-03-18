import { useState, useRef, useEffect } from 'react'
import { EventRegister } from 'react-native-event-listeners'
import { getSubitemList } from '../../../../app/controllers/survey/subitems/SubitemController'
import { errorHandler } from '../../../../helpers/error_handler'

const useSubitemListData = ({ itemId, itemType }) => {
    const [subitems, setSubitems] = useState([])
    const [loading, setLoading] = useState(true)
    const componentMounted = useRef(true)

    useEffect(() => {
        componentMounted.current = true
        const loadData = async () => {
            const { status, response } = await getSubitemList({ itemId: itemId, itemType: itemType }, er => errorHandler(er))
            if (status === 200 && componentMounted.current) {
                setSubitems(response.map(({ uid, id, type, name }) => ({ uid, id, type, name })))
                setLoading(false)
            }
            else setLoading(false)
        }
        loadData()

        const onSubitemUpdate = EventRegister.addEventListener('SUBITEM_UPDATED', ({ subitem }) => {
            const newSubitem = { id: subitem.id, uid: subitem.uid, type: subitem.type, name: subitem.name }
            if (componentMounted.current)
                setSubitems(state => {
                    const index = state.findIndex(({ id }) => id === subitem.id)
                    if (~index)
                        return Object.assign([], state, {
                            [index]: newSubitem
                        })
                    else return [newSubitem].concat(state)
                })
        })

        const onSubitemDelete = EventRegister.addEventListener('SUBITEM_DELETED', ({ subitemId }) => {
            if (componentMounted.current)
                setSubitems(state => state.filter(({ id }) => id !== subitemId))
        })


        return () => {
            EventRegister.removeEventListener(onSubitemUpdate)
            EventRegister.removeEventListener(onSubitemDelete)
            componentMounted.current = false
        }
    }, [])

    return { subitems, loading }
}

export default useSubitemListData