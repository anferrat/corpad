import NetInfo from '@react-native-community/netinfo'
import { Error, errors } from '../../utils/Error'

export class NetworkRepository {
    constructor() { }

    async checkConnection() {
        try {
            return (await NetInfo.fetch()).isInternetReachable
        }
        catch (er) {
            throw new Error(errors.NETWORK, 'Unable to get connectivity status', 'No internet', 102)
        }
    }

    addNetworkListener(callback) {
        return NetInfo.addEventListener(({ isInternetReachable }) => callback(isInternetReachable))
    }
}