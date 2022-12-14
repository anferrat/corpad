import NetInfo from '@react-native-community/netinfo'

export const checkConnection = async () => {
    try {
        const netStatus = await NetInfo.fetch()
        if (netStatus.isInternetReachable)
            return {
                status: 200
            }
        else
            return { status: 102 }
    }
    catch (er) {
        return {
            status: 301
        }
    }
}