import NtpClient from '@ruanitto/react-native-ntp-sync'
import { Error, errors } from '../../utils/Error'

export class NTPRepository {

    constructor() {
        this.clock = new NtpClient({
            history: 1,
            startOnline: true,
            syncOnCreation: false,
            autoSync: false,
            servers:
                [
                    { server: "time.google.com", port: 123 },
                    { server: "time.cloudflare.com", port: 123 },
                    { server: "time.windows.com", port: 123 },
                    { server: "0.pool.ntp.org", port: 123 },
                    { server: "1.pool.ntp.org", port: 123 },
                ]
        })
    }

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