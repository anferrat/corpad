import { useSelector } from "react-redux"

export const useAppLogo = () => {
    const loading = useSelector(state => state.map.loading)

    return { loading }
}