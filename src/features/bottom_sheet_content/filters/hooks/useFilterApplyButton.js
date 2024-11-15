import { EventRegister } from "react-native-event-listeners"

export const useFilterApplyButton = ({ closeSheet }) => {

    const onApplyPress = () => {
        EventRegister.emit('FILTER_APPLIED')
        closeSheet()
    }

    return onApplyPress
}

export default useFilterApplyButton