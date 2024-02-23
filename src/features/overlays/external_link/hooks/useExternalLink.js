import { useEffect, useState } from 'react'
import { decodeLink } from '../../../../app/controllers/survey/other/ExternalLinkController'

export const useExternalLink = (link) => {
    const [data, setData] = useState({
        item: null,
        pipelines: [],
        referenceCells: [],
        potentialTypes: []
    })
    useEffect(() => {
        const onLoad = async () => {
            if (link) {
                const { response, status } = await decodeLink({ link })
                if (status === 200)
                    setData({
                        item: response.item,
                        pipelines: response.pipelines,
                        referenceCells: response.referenceCells,
                        potentialTypes: response.potentialTypes
                    })
            }
        }
        onLoad()
    }, [link])

    return {
        ...data
    }
}