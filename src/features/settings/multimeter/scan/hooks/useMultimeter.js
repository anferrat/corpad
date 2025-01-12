import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { errorHandler } from "../../../../../helpers/error_handler"
import { checkBleState } from "../../../../../app/controllers/MultimeterController"


const useMultimeter = ({ goBack }) => {
    const paired = useSelector(state => state.settings.activeMultimeter.paired)
    const [data, setData] = useState({
        loading: true,
        bleStatus: false,
        connectedDevices: []
    })


    useEffect(() => {
        const getBleState = async () => {
            const isOn = await checkBleState()
            if (isOn.status === 200)
                setData(state => ({
                    ...state,
                    bleStatus: isOn.response,
                    loading: false
                }))
            else errorHandler(isOn.status, goBack)
        }
        getBleState()
    }, [])
    /*
        useEffect(() => {
            if (data.bleStatus) {
                const check = async () => {
                    if (!paired) {
                        const { response, status } = await checkConnectedDevice()
                        if (status === 200) {
                            const { peripheralId, name, multimeterType } = response
                            setData(state => ({ ...state, connectedDevices: [{ peripheralId, name, multimeterType }] }))
                        }
                    }
                    setData(state => ({
                        ...state,
                        loading: false
                    }))
                }
                check()
            }
        }, [data.bleStatus])
    */
    return {
        paired,
        isLoading: data.loading,
        initialBleState: data.bleStatus
    }
}

export default useMultimeter