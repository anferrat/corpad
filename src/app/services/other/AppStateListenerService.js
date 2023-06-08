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
}