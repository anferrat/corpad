export class TimeAdjustmentListener {
    constructor(geolocationRepo, permissions) {
        this.geolocationRepo = geolocationRepo
        this.permissions = permissions
        this.TIME_FIX_LIFE_LENGTH = 300000 //5 min
        this.TIME_FIX_CHECK_INTERVAL = 60000 //1 min
    }

    addListener(callback) {
        const getTimeAdjustment = async (timeout) => {
            try {
                await this.permissions.location()
                const { gnss, device } = await this.geolocationRepo.getGpsTimeAdjustment(timeout)
                this.geolocationRepo.recordTimeFix(gnss, device)
                const prev = this.geolocationRepo.getTimeFix()
                if (gnss !== null && device !== null && prev.gnss === null && prev.device === null)
                    callback({ timeFix: true })
            }
            catch { }
        }
        getTimeAdjustment(600000) //first location wait for 10 min to get first timeFix

        const check = setInterval(() => {
            getTimeAdjustment(10000)
            const { device } = this.geolocationRepo.getTimeFix()
            if (device && Date.now() - device > this.TIME_FIX_LIFE_LENGTH) {
                callback({ timeFix: false })
                this.geolocationRepo.recordTimeFix(null, null)
            }
        }, this.TIME_FIX_CHECK_INTERVAL)

        return () => {
            clearInterval(check)
        }
    }
}