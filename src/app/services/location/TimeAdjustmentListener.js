export class TimeAdjustmentListener {
    constructor(geolocationRepo, permissions) {
        this.geolocationRepo = geolocationRepo
        this.permissions = permissions
        this.TIME_FIX_LIFE_LENGTH = 300000 //5 min
        this.TIME_FIX_CHECK_INTERVAL = 10000 //20 sec
    }

    addListener(callback) {
        const getTimeAdjustment = async () => {
            try {
                await this.permissions.location()
                const { gnss, device } = await this.geolocationRepo.getGpsTimeAdjustment()
                this.geolocationRepo.recordTimeFix(gnss, device)
                const prev = this.geolocationRepo.getTimeFix()
                if (gnss !== null && device !== null && prev.gnss === null && prev.device === null)
                    callback({ timeFix: true })
            }
            catch { }
        }
        getTimeAdjustment()

        const check = setInterval(() => {
            getTimeAdjustment()
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