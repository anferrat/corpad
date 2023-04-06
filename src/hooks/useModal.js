import { useCallback, useState } from 'react'

const useModal = (init = false) => {
    const [visible, setVisible] = useState(init)

    const showModal = useCallback(() => setVisible(true), [])

    const hideModal = useCallback(() => setVisible(false), [])

    return {
        visible,
        showModal,
        hideModal
    }
}

export default useModal