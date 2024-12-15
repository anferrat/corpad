import { AppState } from 'react-native'

export class AppStateListener {
    constructor() {
    }

    addStatusListener(callback) {
        return AppState.addEventListener('change', callback)
    }

    getCurrentState() {
        return AppState.currentState
    }

    appStateListenerWrapper(addListener, removeListener) {
        addListener()
        const subsription = this.addStatusListener(nextAppState => {
            switch (nextAppState) {
                case 'active':
                    addListener()
                    return
                case 'inactive':
                case 'background':
                default:
                    removeListener()
            }
        })
        return () => {
            removeListener()
            subsription.remove()
        }
    }
}