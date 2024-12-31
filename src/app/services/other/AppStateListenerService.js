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

    /*
    wrapper - takes a listener fucntion. listener should return removeListenerFunction. 
    Allows to stop listeners when app goes in background and resumes listeners when app is in foreground
     */

    appStateListenerWrapper(addListener) {
        let removeListener = addListener()
        const subsription = this.addStatusListener(nextAppState => {
            switch (nextAppState) {
                case 'active':
                    removeListener = addListener()
                    return
                case 'inactive':
                case 'background':
                default:
                    removeListener ? removeListener() : null
            }
        })
        return () => {
            removeListener ? removeListener() : null
            subsription.remove()
        }
    }
}