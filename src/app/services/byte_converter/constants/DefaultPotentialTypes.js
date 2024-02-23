import { PotentialType } from '../../../entities/survey/other/PotentialType'
import { PermanentPotentialTypes } from '../../../../constants/global'

export class DefaultPotentialTypes {
    constructor() {
        this.types = [
            new PotentialType(1, 'default-uid-ON', 'On', PermanentPotentialTypes.ON, false),
            new PotentialType(2, 'default-uid-OFF', 'Off', PermanentPotentialTypes.OFF, false),
            new PotentialType(3, 'default-uid-DEPOL', 'Native', PermanentPotentialTypes.DEPOL, false),
            new PotentialType(4, 'default-uid-CONNECTED', 'Connected', PermanentPotentialTypes.CONNECTED, false),
            new PotentialType(5, 'default-uid-DISCONNECTED', 'Disconnected', PermanentPotentialTypes.DISCONNECTED, false)
        ]
        this.typeMap = new Map(
            [[PermanentPotentialTypes.ON, this.types[0]],
            [PermanentPotentialTypes.OFF, this.types[1]],
            [PermanentPotentialTypes.DEPOL, this.types[2]],
            [PermanentPotentialTypes.CONNECTED, this.types[3]],
            [PermanentPotentialTypes.DISCONNECTED, this.types[4]]]
        )
    }

}