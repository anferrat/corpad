export class Survey {
    constructor(uid, name, technician) {
        this.uid = uid
        this.name = name
        this.technician = technician
    }

    reset(uid) {
        this.uid = uid
    }

    setName(name){
        this.name = name
    }
}