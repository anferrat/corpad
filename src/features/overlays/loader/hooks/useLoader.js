import { useEffect } from 'react'
import { BackHandler } from 'react-native'
import { useSelector } from 'react-redux'
import { blockUrlResolver, unblockUrlResolver } from '../../../../app/controllers/AppController'


const backAction = () => true

const useLoader = () => {
    const text = useSelector(state => state.settings.loader.text)
    const loaderVisible = useSelector(state => state.settings.loader.visible)
    const loaderTitle = useSelector(state => state.settings.loader.title)
    const progress = useSelector(state => state.settings.loader.progress)
    const { visible, title, count, total } = progress
    const isProgressVisible = visible && total && count <= total
    const displayedText = isProgressVisible ? `${title} (${count}/${total})` : text

    useEffect(() => {
        let backHandler
        if (loaderVisible) {
            backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
            blockUrlResolver()
        }
        return () => {
            if (loaderVisible) {
                if (backHandler)
                    backHandler.remove()
                unblockUrlResolver()
            }
        }
    }, [loaderVisible])

    return {
        displayedText,
        loaderTitle,
        loaderVisible,
        isProgressVisible,
        total,
        count
    }
}

export default useLoader