import NtpClient from '@ruanitto/react-native-ntp-sync'
import { Error, errors } from '../../utils/Error'

export class NTPRepository {
    clock = new NtpClient({
        history: 1,
        startOnline: true,
        syncOnCreation: false,
        autoSync: false
    })
    constructor() { }

    async getDelta() {
        try {
            const isSuccess = await this.clock.syncTime()
            if (isSuccess) {
                const history = this.clock.getHistory()
                return {
                    delta: -1 * history.deltas[0].dt,
                    deviceTimestamp: history.deltas[0].ntp - history.deltas[0].dt
                }
            }
            else throw 'Sync was unsuccessfull'
        }
        catch (er) {
            throw new Error(errors.TIME, 'Unable to get NTP time delta', er)
        }
    }

}