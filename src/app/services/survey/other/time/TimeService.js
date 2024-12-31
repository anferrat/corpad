import { TimeSyncSources } from "../../../../../constants/global"
import { Error, errors } from "../../../../utils/Error"

export class TimeService {
    /*
Provides methods for automatic (listener) and manual(function call) time sync via both NTP and GPS. 
Delta between actual UTC and device time is available with getDelta method. 
Targeting accuracy 50 ms. Actual accuracy depends...
    */
    constructor(ntpRepo, geolocationRepo, networkRepo, permissions, appStateListener) {
        this.ntpRepo = ntpRepo
        this.geolocationRepo = geolocationRepo
        this.networkRepo = networkRepo
        this.permissions = permissions
        this.appStateListener = appStateListener
        this.BUSY_FLAG = false //time sync is in progress flag
        this.DELTA = null //time delta(UTC - Date.now())
        this.LAST_SYNC_DEVICE_TIMESTAMP = null //Date.now() at last sync
        this.LAST_SYNC_SOURCE = null //NTP or GPS
        this.TIME_FIX_LIFE_LENGTH = 300000 //5 min
        this.TIME_FIX_CHECK_INTERVAL = 60000 //1 min
    }

    async _requestNTPSync() {
        try {
            const isInternetOn = this.networkRepo.checkConnection()
            if (isInternetOn) {
                const { delta, deviceTimestamp } = await this.ntpRepo.getDelta()
                this.DELTA = delta
                this.LAST_SYNC_DEVICE_TIMESTAMP = deviceTimestamp
                this.LAST_SYNC_SOURCE = TimeSyncSources.NTP
                return true
            }
            return false
        }
        catch (er) {
            return false
        }
    }

    async _requestGPSSync() {
        try {
            await this.permissions.location()
            const { delta, deviceTimestamp } = await this.geolocationRepo.getDelta()
            this.DELTA = delta
            this.LAST_SYNC_DEVICE_TIMESTAMP = deviceTimestamp
            this.LAST_SYNC_SOURCE = TimeSyncSources.GPS
            return true
        }
        catch (er) {
            return false
        }
    }

    _resetDelta() {
        this.DELTA = null
        this.LAST_SYNC_DEVICE_TIMESTAMP = null
        this.LAST_SYNC_SOURCE = null
        this.BUSY_FLAG = false
    }

    async _requestSync(source) {
        //If source is not specified we attempt to use both starting with NTP (faster with internet)
        this.BUSY_FLAG = true
        let isSynced = false
        if (source === TimeSyncSources.NTP || source === TimeSyncSources.MIXED)
            isSynced = await this._requestNTPSync()
        if (!isSynced && (source === TimeSyncSources.GPS || source === TimeSyncSources.MIXED))
            isSynced = await this._requestGPSSync()
        this.BUSY_FLAG = false
        return isSynced
    }

    addListener(callback, source) {
        let timeFixInterval
        let removeStateListener

        const addTimeFixInterval = () => {
            timeFixInterval = setInterval(async () => {
                //Check if last delta was obtained recently
                if (this.LAST_SYNC_DEVICE_TIMESTAMP !== null && this.LAST_SYNC_DEVICE_TIMESTAMP + this.TIME_FIX_LIFE_LENGTH > Date.now())
                    callback(true)
                else if (!this.BUSY_FLAG) {
                    //When busy we skip request. User is getting delta manually 
                    const isSynced = await this._requestSync(source)
                    callback(isSynced)
                }
            }, this.TIME_FIX_CHECK_INTERVAL)
            
            return () => timeFixInterval ? clearInterval(timeFixInterval) : null
        }

        this._requestSync(source)
            .then(isSynced => {
                //Initial sync attempt when creating listener
                callback(isSynced)
            })
            .finally(() => {
                removeStateListener = this.appStateListener.appStateListenerWrapper(addTimeFixInterval)
            })
        return () => {
            if (removeStateListener)
                removeStateListener()
            this._resetDelta()
        }
    }

    syncTime(source) {
        if (!this.BUSY_FLAG)
            return this._requestSync(source)
        else
            throw new Error(errors.TIME, 'Unable to sync time', 'Time syncing in progress', 847)
    }

    getDelta() {
        return this.DELTA !== null ? this.DELTA : undefined
    }

}