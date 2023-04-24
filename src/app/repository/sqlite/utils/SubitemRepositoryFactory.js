import { AnodeRepository } from "../SubitemRepository/AnodeRepository"
import { PipelineLeadRepository } from "../SubitemRepository/PipelineLeadRepository"
import { StatRefrenceCellRepository } from "../SubitemRepository/StatReferenceCellRepository"
import { CouponRepository } from "../SubitemRepository/CouponRepository"
import { BondRepository } from "../SubitemRepository/BondRepository"
import { ShuntRepository } from "../SubitemRepository/ShuntRepository"
import { RiserRepository } from "../SubitemRepository/RiserRepository"
import { IsolationRepository } from "../SubitemRepository/IsolationRepository"
import { StructureRepository } from "../SubitemRepository/StructureRepository"
import { CircuitRepository } from "../SubitemRepository/CircuitRepository"
import { Error, errors } from "../../../utils/Error"
import { SubitemTypes } from "../../../entities/survey/subitems/Subitem"
import { TestLeadRepository } from "../SubitemRepository/TestLeadRepository"

export class SubitemRepositoryFactory {
    constructor() {
        this.anodeRepo = new AnodeRepository()
        this.pipelineLeadRepo = new PipelineLeadRepository()
        this.statReferenceCellRepo = new StatRefrenceCellRepository()
        this.couponRepo = new CouponRepository()
        this.bondRepo = new BondRepository()
        this.shuntRepo = new ShuntRepository()
        this.riserRepo = new RiserRepository()
        this.isolationRepo = new IsolationRepository()
        this.structureRepo = new StructureRepository()
        this.circuitRepo = new CircuitRepository()
        this.testLeadRepo = new TestLeadRepository()
    }

    execute(type) {
        switch (type) {
            case SubitemTypes.ANODE:
                return this.anodeRepo
            case SubitemTypes.PIPELINE:
                return this.pipelineLeadRepo
            case SubitemTypes.REFERENCE_CELL:
                return this.statReferenceCellRepo
            case SubitemTypes.COUPON:
                return this.couponRepo
            case SubitemTypes.BOND:
                return this.bondRepo
            case SubitemTypes.SHUNT:
                return this.shuntRepo
            case SubitemTypes.RISER:
                return this.riserRepo
            case SubitemTypes.ISOLATION:
                return this.isolationRepo
            case SubitemTypes.STRUCTURE:
                return this.structureRepo
            case SubitemTypes.CIRCUIT:
                return this.circuitRepo
            case SubitemTypes.TEST_LEAD:
                return this.testLeadRepo
            default:
                throw new Error(errors.DATABASE, `Unknown subitem type ${type}. Cannot proceed with database operation.`)
        }
    }
}