import { useCallback, useState, useRef, useEffect } from 'react'
import { getSurveyList } from '../../../app/controllers/survey/SurveyFileListController'
import { errorHandler } from '../../../helpers/error_handler'


const useSurveyFiles = ({ isCloud }) => {
    const [fileList, setFileList] = useState({
        today: [],
        earlier: [],
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (loading)
            getSurveyList({ isCloud },
                (er, message) => {
                    errorHandler(er)
                    console.log(message)
                },
                ({ today, earlier }) => {
                    setFileList({
                        today: today,
                        erlier: earlier
                    })
                    setLoading(false)
                }
            )
    }, [loading])

    const refreshHandler = useCallback(() => setLoading(true), [])
    return {
        fileList,
        refreshHandler
    }
}

export default useSurveyFiles