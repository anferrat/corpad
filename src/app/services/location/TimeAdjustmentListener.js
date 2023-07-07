export class TimeAdjustmentListener {
    constructor(geolocationRepo, permissions) {
        this.geolocationRepo = geolocationRepo
        this.permissions = permissions
        this.TIME_UPDATE_INTERVAL = 15000//300000 //ms
    }

    addListener(callback) {
        const getTimeAdjustment = async () => {
            try {
                await this.permissions.location()
                callback(await this.geolocationRepo.getGpsTimeAdjustment())
            }
            catch { }
        }

        getTimeAdjustment()
        const intervalTimer = setInterval(getTimeAdjustment, this.TIME_UPDATE_INTERVAL)
        return () => clearInterval(intervalTimer)
    }
}