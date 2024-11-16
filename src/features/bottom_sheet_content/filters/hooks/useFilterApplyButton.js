import { EventRegister } from "react-native-event-listeners"

export const useFilterApplyButton = ({ closeSheet }) => {

    const onApplyPress = () => {
        closeSheet()
        EventRegister.emit('FILTER_APPLIED')
    }

    return onApplyPress
}

export default useFilterApplyButton