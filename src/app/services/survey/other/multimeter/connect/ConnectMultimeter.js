export class ConnectMultimeter {
    constructor(settingRepo, permissions, multimeterFactory, bluetoothRepo) {
        this.settingRepo = settingRepo
        this.permissions = permissions
        this.multimeterFactory = multimeterFactory
        this.bluetoothRepo = bluetoothRepo
    }

    async _wait(func, delay) {
        if (delay === 0)
            return await func()
        return setTimeout(async () => {
            try { await func() }
            catch { }
        }, delay)
    }

    async execute(delay = 0) {
        const [{ multimeter }] = await Promise.all([
            this.settingRepo.get(),
            this.permissions.bluetooth()
        ])
        const { peripheralId, type } = multimeter
        if (peripheralId !== null && peripheralId) {
            await this.bluetoothRepo.checkState()
            const multimeterService = this.multimeterFactory.execute(type)
            await this._wait(() => multimeterService.start(peripheralId), delay)
            return {
                isConnected: true
            }
        }
        return {
            isConnected: false
        }
    }
}