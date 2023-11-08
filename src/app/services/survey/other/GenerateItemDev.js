import { AnodeMaterials, IsolationTypes, ItemStatuses, PermanentPotentialTypes, PipeDiameters, ReferenceCellTypes, SubitemTypes, TestPointTypes, WireColors, WireGauges, CouponTypes } from "../../../../constants/global"
import { TestPoint } from "../../../entities/survey/items/TestPoint"
import { Anode } from "../../../entities/survey/subitems/Anode"
import { Bond } from "../../../entities/survey/subitems/Bond"
import { Coupon } from "../../../entities/survey/subitems/Coupon"
import { Isolation } from "../../../entities/survey/subitems/Isolation"
import { PipelineLead } from "../../../entities/survey/subitems/PipelineLead"
import { Potential } from "../../../entities/survey/subitems/Potential"
import { Riser } from "../../../entities/survey/subitems/Riser"
import { Shunt } from "../../../entities/survey/subitems/Shunt"
import { StatReferenceCell } from "../../../entities/survey/subitems/StatReferenceCell"
import { Structure } from "../../../entities/survey/subitems/Structure"
import { TestLead } from "../../../entities/survey/subitems/TestLead"
import { guid } from "../../../utils/guid"

export class GenerateItem {
    constructor(testPointRepo, subitemRepo, potentialRepo, pipelineRepo, potentialTypeRepo, referenceCellRepo) {
        this.testPointRepo = testPointRepo
        this.subitemRepo = subitemRepo
        this.potentialRepo = potentialRepo
        this.pipelineRepo = pipelineRepo
        this.potentialTypeRepo = potentialTypeRepo
        this.referenceCellRepo = referenceCellRepo
        this.locations = ['77 Silver Spear Dr.', '378 Briarwood St.', '444 Studebaker St.', '454 Hillcrest Ave.', '886 Piper Street', '56 Warren St.', '26 Bradford St.', '17 Valley Farms Ave.', '99 N. Glenlake St.', '7564 N. Pennington St.', '8982 Central Ave.', '123 Highland Dr.']
        this.comments = ['HelloWorld', 'Nothing cool but we can read this', 'Ignorance is a bliss', 'BEAR detected', 'When does vacation start again?', 'Hmm, I dont see nothing, but Ill leave a comment here just in case', 'Try to come up with 10 different comments yourself']
        this.NUMBER_OF_FIRST_ORDER_SUBITEMS = 5
        this.NUMBER_OF_SECOND_ORDER_SUBITEMS = 2
        this.SUBITEM_TYPES_WITH_POTENTIALS = [SubitemTypes.PIPELINE, SubitemTypes.ANODE, SubitemTypes.RISER, SubitemTypes.STRUCTURE]
        this.statuses = [ItemStatuses.ATTENTION, ItemStatuses.BAD, ItemStatuses.GOOD, ItemStatuses.UNKNOWN]
    }

    genRandomIndex(array) {
        return Math.floor((Math.random() * (array.length)))
    }

    getRandomItem(object) {
        const keys = Object.keys(object)
        const index = Math.floor((Math.random() * (keys.length)))
        return object[keys[index]] ?? null
    }

    getRandomFloat(min, max) {
        const delta = Math.abs(Math.abs(max) - Math.abs(min))
        return (max - delta * Math.random()).toFixed(3)
    }

    getRandomCoord(min, max) {
        const delta = Math.abs(Math.abs(max) - Math.abs(min))
        return (max - delta * Math.random()).toFixed(7)
    }

    getRandomInt(min, max) {
        return Math.floor(this.getRandomFloat(min, max))
    }

    async generateTestPoint(index) {
        const testPoint = new TestPoint(null, guid(), `TP${index + 1}`, this.getRandomItem(this.statuses), Date.now(), Date.now(), this.getRandomItem(this.comments), this.getRandomItem(this.locations), this.getRandomCoord(49, 50), this.getRandomCoord(-123, -122), this.getRandomItem(TestPointTypes))
        return await this.testPointRepo.create(testPoint)
    }

    async generateFirstOrderSubitems(itemId, index, pipelines) {
        const subitemType = this.getRandomItem([SubitemTypes.ANODE, SubitemTypes.PIPELINE, SubitemTypes.STRUCTURE, SubitemTypes.REFERENCE_CELL, SubitemTypes.RISER, SubitemTypes.TEST_LEAD])
        let subitem
        const pipelineId = pipelines.length === 0 ? null : this.getRandomItem(pipelines).id
        const wireGauge = this.getRandomItem(WireGauges)
        const wireColor = this.getRandomItem(WireColors)
        switch (subitemType) {
            case SubitemTypes.ANODE:
                subitem = new Anode(null, itemId, guid(), `Anode${index + 1}`, this.getRandomItem(AnodeMaterials), wireGauge, wireColor)
                break
            case SubitemTypes.PIPELINE:
                subitem = new PipelineLead(null, itemId, guid(), `Pipeline${index + 1}`, pipelineId, wireGauge, wireColor)
                break
            case SubitemTypes.STRUCTURE:
                subitem = new Structure(null, itemId, guid(), `Structure${index + 1}`, 'Here we go')
                break
            case SubitemTypes.REFERENCE_CELL:
                subitem = new StatReferenceCell(null, itemId, guid(), `RefCell${index + 1}`, this.getRandomItem(ReferenceCellTypes), wireGauge, wireColor)
                break
            case SubitemTypes.RISER:
                subitem = new Riser(null, itemId, guid(), `Riser${index + 1}`, pipelineId, this.getRandomItem(PipeDiameters))
                break
            case SubitemTypes.TEST_LEAD:
                subitem = new TestLead(null, itemId, guid(), `Test lead${index + 1}`, wireGauge, wireColor)
                break
        }
        if (subitem)
            return await this.subitemRepo.create(subitem)
    }

    async generateSecondOrderSubitems(itemId, index, firstOrderSubitems) {
        const subitemType = this.getRandomItem([SubitemTypes.BOND, SubitemTypes.ISOLATION, SubitemTypes.SHUNT, SubitemTypes.COUPON])
        let subitem
        const getSides = (firstOrderSubitems, acceptedTypes) => {
            const sideOptions = firstOrderSubitems.filter(({ type }) => ~acceptedTypes.indexOf(type))
            const sideANumber = 1
            const sideBNumber = 1
            return {
                sideA: Array.apply(null, new Array(sideANumber)).map(() => this.getRandomItem(sideOptions).id),
                sideB: Array.apply(null, new Array(sideBNumber)).map(() => this.getRandomItem(sideOptions).id)
            }
        }
        switch (subitemType) {
            case SubitemTypes.BOND:
                {
                    const { sideA, sideB } = getSides(firstOrderSubitems, [SubitemTypes.TEST_LEAD, SubitemTypes.PIPELINE, SubitemTypes.ANODE, SubitemTypes.RISER])
                    subitem = new Bond(null, itemId, guid(), `Bond${index}`, this.getRandomItem([true, false]), this.getRandomFloat(0, 3), sideA, sideB, this.getRandomFloat(0, 3))
                    break
                }
            case SubitemTypes.SHUNT:
                {
                    const { sideA, sideB } = getSides(firstOrderSubitems, [SubitemTypes.TEST_LEAD, SubitemTypes.PIPELINE, SubitemTypes.ANODE, SubitemTypes.RISER])
                    subitem = new Shunt(null, itemId, guid(), `Shunt${index}`, this.getRandomFloat(0, 300), null, null, true, null, this.getRandomFloat(0, 5), this.getRandomItem([true, false]), sideA, sideB, this.getRandomFloat(0, 5))
                    break
                }
            case SubitemTypes.ISOLATION:
                {
                    const { sideA, sideB } = getSides(firstOrderSubitems, [SubitemTypes.RISER, SubitemTypes.STRUCTURE])
                    const shorted = this.getRandomItem([true, false])
                    subitem = new Isolation(null, itemId, guid(), `Isolation${index + 1}`, this.getRandomItem([true, false]), this.getRandomItem(IsolationTypes), shorted, shorted ? this.getRandomFloat(0, 3) : null, sideA, sideB)
                    break
                }
            case SubitemTypes.COUPON:
                {
                    const pipelineSubitems = firstOrderSubitems.filter(({ type }) => type === SubitemTypes.PIPELINE || type === SubitemTypes.RISER)
                    const pipelineSubitemId = pipelineSubitems.length === 0 ? null : this.getRandomItem(pipelineSubitems).id
                    subitem = new Coupon(null, itemId, guid(), `Coupon${index + 1}`, pipelineSubitemId, this.getRandomItem(WireGauges), this.getRandomItem(WireColors), this.getRandomItem(CouponTypes), this.getRandomInt(0, 100), null, this.getRandomInt(50, 150), this.getRandomInt(50, 150))
                    break
                }
        }
        if (subitem)
            return await this.subitemRepo.create(subitem)
    }

    async generatePotentials(subitemId, potentialTypes, referenceCells) {
        const permanentTypes = [PermanentPotentialTypes.ON, PermanentPotentialTypes.OFF, PermanentPotentialTypes.DEPOL]
        const types = potentialTypes.filter(({ type }) => ~permanentTypes.indexOf(type))
        const mainReferenceId = referenceCells.find(({ isMainReference }) => isMainReference).id
        const potentials = types.map(({ id }) => new Potential(null, guid(), subitemId, this.getRandomFloat(0, 3), id, mainReferenceId, true, this.getRandomFloat(0, 3)))
        return await Promise.all(potentials.map(potential => this.potentialRepo.create(potential)))
    }

    async generateSubitems(itemId, pipelines, potentialTypes, referenceCells) {
        let subitems = []
        let firstOrder = []
        for (let i = 0; i < this.NUMBER_OF_FIRST_ORDER_SUBITEMS; i++) {
            const subitem = await this.generateFirstOrderSubitems(itemId, i, pipelines)
            subitems.push(subitem)
            firstOrder.push(subitem)
        }
        for (let i = 0; i < this.NUMBER_OF_SECOND_ORDER_SUBITEMS; i++) {
            const subitem = await this.generateSecondOrderSubitems(itemId, i, firstOrder)
            subitems.push(subitem)
        }
        const potSubitems = subitems.filter(({ type }) => ~this.SUBITEM_TYPES_WITH_POTENTIALS.indexOf(type))
        await Promise.all(potSubitems.map(({ id }) => this.generatePotentials(id, potentialTypes, referenceCells)))
    }

    async execute(count) {
        const [pipelines, potentialTypes, referenceCells] = await Promise.all([
            this.pipelineRepo.getAll(),
            this.potentialTypeRepo.getAll(),
            this.referenceCellRepo.getAll()
        ])
        for (let i = 0; i < count; i++) {
            const testPoint = await this.generateTestPoint(i)
            await this.generateSubitems(testPoint.id, pipelines, potentialTypes, referenceCells)
            //console.log('Generated item ', i)
        }
    }

}