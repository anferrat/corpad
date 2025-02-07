import NtpClient from '@ruanitto/react-native-ntp-sync'
import { Error, errors } from '../../utils/Error'

export class NTPRepository {

    constructor() {
        this.clock = new NtpClient({
            history: 7,
            startOnline: true,
            syncOnCreation: false,
            autoSync: false,
            servers:
                [
                    { server: "0.pool.ntp.org", port: 123 },
                    { server: "1.pool.ntp.org", port: 123 },
                    { server: "time.google.com", port: 123 },
                    { server: "time.cloudflare.com", port: 123 },
                    { server: "time.windows.com", port: 123 },

                ]
        })
    }

    async getDelta() {
        try {
            let success = false
            for (let i = 0; i < 7; i++) {
                const isSuccess = await this.clock.syncTime()
                await new Promise((resolve) => setTimeout(resolve, 200))
                if (isSuccess)
                    success = isSuccess
            }

            if (success) {
                const history = this.clock.getHistory()
                const deltas = history.deltas.map(({ dt }) => dt)
                const delta = this._filterAndAverage(deltas)
                return {
                    delta,
                    deviceTimestamp: history.deltas[history.deltas.length - 1].ntp - history.deltas[history.deltas.length - 1].dt
                }
            }
            else throw 'Sync was unsuccessfull'
        }
        catch (er) {
            throw new Error(errors.TIME, 'Unable to get NTP time delta', er)
        }
    }

    _filterAndAverage(deltas) {
        if (deltas.length === 0) return 0
        if (deltas.length === 1) return deltas[0]
        if (deltas.length === 2) return Math.floor((deltas[0] + deltas[1]) / 2)
        const sorted = [...deltas].sort((a, b) => a - b)
        const median = sorted[Math.floor(sorted.length / 2)]
        const deviations = sorted.map(x => Math.abs(x - median))
        const mad = deviations[Math.floor(deviations.length / 2)]
        const threshold = 1.5 * mad
        const filtered = sorted.filter(x => Math.abs(x - median) <= threshold)
        const average = Math.floor(filtered.reduce((sum, val) => sum + val, 0) / filtered.length)
        return average
    }

}