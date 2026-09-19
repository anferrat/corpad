import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSubitemById, updateSubitem, deleteSubitem } from '../../../../app/controllers/survey/subitems/SubitemController'
import { loadSubitemState, updateSubitemProperty, resetSubitemState } from '../../../../store/actions/subitem'
import { EventRegister } from 'react-native-event-listeners'
import { errorHandler } from '../../../../helpers/error_handler'
import { useNavigation } from '@react-navigation/native'
import { onSubitemSave, SUBITEM_UPDATED } from '../../../../helpers/events'
import useUnsavedChanges from '../../../../hooks/useUnsavedChanges'

const subitemTypesWithPotentials = ['AN', 'PL', 'RE', 'CN', 'OT', 'FC', 'RS']

const useSubitemData = ({ itemId, subitemId, subitemType, isNew }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const subitemData = useSelector(state => state.subitem)
    const potentialsData = useSelector(state => state.potentials)
    const { pipelineId, pipelineNameAsDefault, pipelineList, defaultName, loading } = subitemData
    const hasPotentials = subitemTypesWithPotentials.includes(subitemType)
    const deletionMatcher = useCallback(({ itemId: deletedItemId, subitemId: deletedSubitemId, subitemType: deletedSubitemType }) => deletedItemId === itemId && deletedSubitemId === subitemId && deletedSubitemType === subitemType, [itemId, subitemId, subitemType])
    const { allowRemoval } = useUnsavedChanges({
        data: subitemData,
        ready: !loading,
        additionalData: potentialsData.potentials,
        additionalReady: !hasPotentials || !potentialsData.loading,
        saving: subitemData.saving,
        deletionEvent: 'SUBITEM_DELETED',
        deletionMatcher,
    })
    //By defualt new database subitem created, if not saved it needs to be removed
    const deleteOnExit = useRef(isNew)

    useEffect(() => {
        //Initial loading request to database and load to state
        const loadData = async () => {
            const subitem = await getSubitemById({ itemId, subitemId, subitemType }, er => errorHandler(er, navigation.goBack))
            if (subitem.status === 200)
                dispatch(loadSubitemState(subitem.response))
        }
        loadData()

        return () => {
            //deleting subitem if wasn't saved - need to change this behavior for later
            dispatch(resetSubitemState())
            if (deleteOnExit.current)
                deleteSubitem({ subitemId, subitemType, itemId })
        }
    }, [])

    useEffect(() => {
        const onSaveHandler = EventRegister.addEventListener(onSubitemSave, async ({ subitem }) => {
            if (!loading) {
                const { status, response, errorMessage } = await updateSubitem(subitem, (er) => errorHandler(er))
                if (status === 200) {
                    deleteOnExit.current = false
                    allowRemoval()
                    EventRegister.emit(SUBITEM_UPDATED, response)
                    navigation.goBack()
                }
                else {
                    dispatch(updateSubitemProperty(false, 'saving'))
                }
            }
        })
        return () => {
            EventRegister.removeEventListener(onSaveHandler)
        }
    }, [loading, allowRemoval])

    //When pipeline selected for PL and RS and pipelineName as default set, updates defaultName property based on pipelineId
    useEffect(() => {
        if (pipelineNameAsDefault && !loading) {
            const pipeIndex = pipelineList.findIndex(p => p.id === pipelineId)
            dispatch(updateSubitemProperty(~pipeIndex ? pipelineList[pipeIndex].name : defaultName, 'defaultName'))
        }
    }, [pipelineId, loading])

    return subitemData
}

export default useSubitemData
