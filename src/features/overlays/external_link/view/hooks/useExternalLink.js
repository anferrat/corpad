import { useEffect, useRef, useState } from 'react'
import { addLinkDataToSurvey, decodeLink, logExternalLink } from '../../../../../app/controllers/survey/other/ExternalLinkController'
import { ExternalLinkTypes, PotentialUnits } from '../../../../../constants/global'
import { errorHandler } from '../../../../../helpers/error_handler'
import { EventRegister } from "react-native-event-listeners"

export const useExternalLink = ({ link, shouldLog, navigateToFindItem, navigateToPipelineMatching, goBack, navigateToItem, navigateToSurvey }) => {
    const [data, setData] = useState({
        id: null,
        technician: null,
        item: null,
        pipelines: [],
        potentialUnit: PotentialUnits.VOLTS,
        linkType: ExternalLinkTypes.NFC,
        isSurveyLoaded: false,
        loading: true
    })
    const [isCreating, setIsCreating] = useState(false)
    const componentMounted = useRef(true)

    useEffect(() => {
        componentMounted.current = true
        const onLoad = async () => {
            if (link) {
                const { response, status } = await decodeLink({ link })
                if (componentMounted.current) {
                    if (status === 200) {
                        if (shouldLog) {
                            //on fail do nothing
                            await logExternalLink({
                                tagId: response.tagId,
                                name: response.item.name,
                                linkType: response.linkType,
                                technician: response.technician,
                                itemType: response.item.itemType,
                                location: response.item.location,
                                link: link
                            }, null, () => EventRegister.emit('NEW_EXTERNAL_LINK_LOGGED'))
                        }
                        setData({
                            tagId: response.tagId,
                            technician: response.technician,
                            item: response.item,
                            pipelines: response.pipelines,
                            potentialUnit: response.potentialUnit,
                            linkType: response.linkType,
                            isSurveyLoaded: response.isSurveyLoaded,
                            loading: false,
                        })
                    }
                    else
                        errorHandler(status, goBack)
                }
            }
        }
        onLoad()
        return () => {
            componentMounted.current = false
        }
    }, [link])

    const goToFindInSurvey = () => {
        if (data.item && data.isSurveyLoaded)
            navigateToFindItem(data.item.itemType, data.item.uid, data.item.name, data.item.latitude, data.item.longitude)
    }

    const addToSurvey = async () => {
        if (data.item && data.isSurveyLoaded && !isCreating) {
            setIsCreating(true)
            const { status, response } = await addLinkDataToSurvey({ link })
            if (componentMounted.current) {
                if (status === 200) {
                    const { isPipelineMapped, createdItemId, createdItemType } = response
                    if (isPipelineMapped) {
                        if (createdItemId && createdItemType) {
                            EventRegister.emit('GLOBAL_ITEM_UPDATED', { itemId: createdItemId, itemType: createdItemType })
                            navigateToItem(createdItemId, createdItemType)
                        }
                        else errorHandler(829)
                    }
                    else
                        navigateToPipelineMatching()
                }
                else if (status !== 101)
                    errorHandler(829)
                setIsCreating(false)
            }
        }
    }

    return {
        ...data,
        isCreating,
        goToFindInSurvey,
        addToSurvey,
    }
}