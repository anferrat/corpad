import { useSelector } from "react-redux"
import { useBottomSheetNavigation } from "../bottom_sheet/useBottomSheetNavigation"

const useSurveyListBottomTabs = () => {
    const isSigned = useSelector(state => state.settings.session.isSigned)
    const isInternetOn = useSelector(state => state.settings.session.isInternetOn)
    const isCloudSurvey = useSelector(state => state.settings.currentSurvey.isCloudSurvey)
    const { openBasicMenu } = useBottomSheetNavigation()
    return {
        openBasicMenu,
        isSigned,
        isInternetOn,
        isCloudSurvey
    }
}

export default useSurveyListBottomTabs