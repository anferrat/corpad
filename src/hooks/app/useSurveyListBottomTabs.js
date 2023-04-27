import { useSelector } from "react-redux"
import { useBottomSheetNavigation } from "../bottom_sheet/useBottomSheetNavigation"

const useSurveyListBottomTabs = () => {
    const isSigned = useSelector(state => state.settings.session.isSigned)
    const isInternetOn = useSelector(state => state.settings.session.isInternetOn)
    const isCloud = useSelector(state => state.settings.currentSurvey.isCloud)
    const { openBasicMenu } = useBottomSheetNavigation()
    return {
        openBasicMenu,
        isSigned,
        isInternetOn,
        isCloud
    }
}

export default useSurveyListBottomTabs