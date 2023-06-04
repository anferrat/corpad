export class PokitMultimeterService {
    constructor(bluetoothRepo) {
        this.bluetoothRepo = bluetoothRepo
        this.MMServiceUUID = 'e7481d2f-5781-442e-bb9a-fd4e3441dadc'
    }

    async init() {
        return await this.bluetoothRepo.init()
    }

    async test() {
        const res = await this.bluetoothRepo.getConnectedDevices([this.MMServiceUUID])
        const id = res[0].id
        console.log(id)
        await this.bluetoothRepo.connect(id)
        const isConnected = await this.bluetoothRepo.isDeviceConnected(id)
        console.log('Is connected', isConnected)
        const services = await this.bluetoothRepo.retrieveServices(id, [this.MMServiceUUID])
        console.log('hola', services)
        const data = await this.bluetoothRepo.read(id, this.MMServiceUUID, '047d3559-8bee-423a-b229-4417fa603b90')
        console.log(data)
        return data
    }

    

}