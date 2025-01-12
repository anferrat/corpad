//constants with multimeter uuids that scan is looking for. Used only for scan, managed separatley from device characteristics

import { MultimeterTypes } from "../../../../../../constants/global";

export class MultimeterScanServiceUuids {
    constructor() {

        this.uuids = {
            '1569801e-1425-4a7a-b617-a4f4ed719de6': MultimeterTypes.POKIT //DSO service - unique for Pokit Pro
        }
        
        this.list = Object.keys(this.uuids)
    }

}